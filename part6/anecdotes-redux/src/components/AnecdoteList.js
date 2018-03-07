import React from 'react'
import PropTypes from 'prop-types'
import { castVote } from '../reducers/anecdoteReducer'
import { notify, hide } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const store = this.context.store
    const anecdotes = store.getState().anecdotes
    const filter = store.getState().filter.filter
    console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .filter(anecdote => filter.length === 0 || anecdote.content.toLowerCase().includes(filter.toLowerCase()))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}&nbsp;
                <button onClick={() => {
                  store.dispatch(castVote(anecdote))
                  store.dispatch(notify(`You voted '${anecdote.content}'`))
                  setTimeout(() => store.dispatch(hide()), 5000)
                }}>
                  vote
                </button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
