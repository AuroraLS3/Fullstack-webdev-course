import React from 'react';
import Numerot from './Numerot'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      this.setState({persons: response.data})
    })
  }

  submit = (event) => {
    event.preventDefault()

    const newName = this.state.newName
    const newNumber = this.state.newNumber

    const onkoTiedossa = this.state.persons.filter(person => person.name === newName).length > 0

    if (onkoTiedossa) {
      alert('Nimi on jo käytössä!')
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const persons = this.state.persons.concat(newPerson)
  
    this.setState({persons: persons, newName: '', newNumber: ''})
  }

  handleNameChange = (event) => {
    const uusi = event.target.value
    this.setState({newName: uusi})
  }

  handleNumberChange = (event) => {
    const uusi = event.target.value
    this.setState({newNumber: uusi})
  }

  handleSearchChange = (event) => {
    const uusi = event.target.value
    this.setState({search: uusi})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.submit}>
        <div>
            Hae: 
            <input 
              value={this.state.search}
              onChange={this.handleSearchChange}
            />
          </div>
          <div>
            <h2>Lisää uusi</h2>
            <div>
              Nimi: 
              <input 
                value={this.state.newName}
                onChange={this.handleNameChange}
              />
            </div>
            <div>
              Numero: 
              <input 
                value={this.state.newNumber}
                onChange={this.handleNumberChange}
              />
            </div>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Numerot search={this.state.search} persons={this.state.persons} />
      </div>
    )
  }
}

export default App