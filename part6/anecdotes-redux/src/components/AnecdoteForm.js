import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify, hide } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  constructor(props) {
    super(props)
  }

  handleSubmit(e) {
    e.preventDefault()
    const content = e.target.anecdote.value

    this.props.store.dispatch(createAnecdote(content))
    this.props.store.dispatch(notify(`Created new Anecdote: '${content}'`))
    setTimeout(() => this.props.store.dispatch(hide()), 5000)

    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={(event) => {
          this.handleSubmit.bind(this)
          this.handleSubmit(event)
        }}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
