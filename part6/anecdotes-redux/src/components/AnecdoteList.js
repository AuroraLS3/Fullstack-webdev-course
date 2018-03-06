import React from 'react'

import { castVote } from '../reducers/anecdoteReducer'
import { notify, hide } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}&nbsp;
              <button onClick={() => {
                this.props.store.dispatch(castVote(anecdote))
                this.props.store.dispatch(notify(`You voted '${anecdote.content}'`))
                setTimeout(() => this.props.store.dispatch(hide()), 5000)
              }}
              >
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
