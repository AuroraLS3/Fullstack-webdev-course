import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyDefault } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit = (e) =>  {
    e.preventDefault()
    const content = e.target.anecdote.value

    this.props.createAnecdote(content)
    this.props.notifyDefault(
      `Created new Anecdote: '${content}'`
    )

    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default connect(
  null, { createAnecdote, notifyDefault }
)(AnecdoteForm)