import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import FetchDemo from './FetchDemo'
import axios from 'axios'

class App extends Component {
  state = {
    characters: [
    ],
  }

  removeCharacter = index => {
    console.log('in this')
    const { characters } = this.state
    let thisUser = characters[index]
    let thisID = thisUser['id']


    return axios.delete(`http://localhost:5000/users/${thisID}`)
      .then( resp => {
        console.log(resp)
        return (resp.status===200)
      })
      .then( val => {
        if (val == true) {
          this.setState({
            characters: characters.filter((character, i) => {
              return i !== index
            }),
          })
        }
        else
        {
          console.error("AHHHH FIX ME LINE 34")
        }
      })

    
  }

  makePostCall(character){
    return axios.post('http://localhost:5000/users', character)
     .then(function (response) {
       console.log(response);
       character['id'] = response.data.id
       return (response.status === 201);
     })
     .catch(function (error) {
       console.log(error);
       return false;
     });
  }

  handleSubmit = character => {
    this.makePostCall(character).then( callResult => {
       if (callResult === true) {
          this.setState({ characters: [...this.state.characters, character] });
       }
    });
  }

  componentDidMount() {
    const url = 'http://localhost:5000/users'
    axios.get(url)
     .then(res => {
       const characters = res.data.users_list;
       this.setState({ characters });
     })
     .catch(function (error) {
       //Not handling the error. Just logging into the console.
       console.log(error);
     });
 }

  render() {
    const { characters } = this.state;
    
    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit = {this.handleSubmit}/>
        {/* <FetchDemo subreddit='r/calpoly'/> */}
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     const characters = [
//         {
//           name: 'Charlie',
//           job: 'Janitor',
//         },
//         {
//           name: 'Mac',
//           job: 'Bouncer',
//         },
//         {
//           name: 'Dee',
//           job: 'Aspring actress',
//         },
//         {
//           name: 'Dennis',
//           job: 'Bartender',
//         },
//       ]

//     return (
//       <div className="container">
//         <Table characterData = {characters} />
//       </div>
//     )
//   }
// }

export default App