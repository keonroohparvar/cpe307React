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
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] })
  };

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