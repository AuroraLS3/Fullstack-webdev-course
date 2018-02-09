import React from 'react';
import Numerot from './Numerot'
import Notification from './Notification'
import personsService from './services/persons.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: '',

      message: null
    }
  }

  setMsg = (msg) => {
    this.setState({message: msg})
    setTimeout(() => {
      this.setState({message: null})
    }, 5000)
  }

  componentDidMount() {
    personsService.getAll()
    .then(response => {
      this.setState({persons: response.data})
    })
  }

  submit = (event) => {
    event.preventDefault()

    const newName = this.state.newName
    const newNumber = this.state.newNumber

    const tiedetty = this.state.persons.filter(person => person.name === newName)

    if (tiedetty.length > 0) {
      const person = tiedetty[0]
      if (window.confirm(person.name+' löytyy jo, päivitetäänkö numero?')) {
        person.number = newNumber
        
        personsService.update(person)
        .then(response => {
          const newPersons = this.state.persons
          this.setState({persons: newPersons})
          this.setMsg('Numero päivitetty!')
        })
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService.create(newPerson)
    .then(response => {
      newPerson.id = response.data.id
      const persons = this.state.persons.concat(newPerson)
        this.setState({persons: persons, newName: '', newNumber: ''})
        this.setMsg('Numero lisätty!')
      })
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

  poista = (person) => () => {
    if (window.confirm('Poistetaanko '+person.name+'?')) {
      personsService.remove(person.id)
      .then(response => {
        const newPersons = this.state.persons.filter(p => p.id !== person.id)
        this.setState({persons: newPersons})
        this.setMsg('Numero poistettu!')
      }).catch(error => {
        const newPersons = this.state.persons.filter(p => p.id !== person.id)
        this.setState({persons: newPersons})
        this.setMsg('Numero oli jo poistettu!')
      })
    }
  }

  render() {
    return (
      <div>
        <Notification message={this.state.message} />
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
        <Numerot poista={this.poista} search={this.state.search} persons={this.state.persons} />
      </div>
    )
  }
}

export default App