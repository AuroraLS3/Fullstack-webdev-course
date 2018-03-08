import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import Notification from './components/Notification'

const Menu = () => (
  <div>
    <Link to='/'>anecdotes</Link>&nbsp;
    <Link to='/new'>create new</Link>&nbsp;
    <Link to='/about'>about</Link>&nbsp;
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  notify = (message) => {
    this.setState({ notification: message })
    setTimeout(() => this.setState({notification: ''}), 10000)
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.notify(`New Anecdote "${anecdote.content}" created!`)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  anecdoteById = (id) => {
    return this.state.anecdotes.find(anecdote => anecdote.id === id)
  }

  render() {
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Notification notification={this.state.notification} />
        <Router>
          <div>
            <Menu />
            <Route exact path="/" render={() =>
              <AnecdoteList anecdotes={this.state.anecdotes} />
            } />
            <Route path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />
            } />
            <Route path="/new" render={({history}) =>
              <CreateNew history={history} addNew={this.addNew} />
            } />
            <Route path="/about" render={() =>
              <About />
            } />
          </div>
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;
