import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { notifyDefault } from '../reducers/notificationReducer'

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
                  this.props.castVote(anecdote)
                  this.props.notifyDefault(
                    `You voted '${anecdote.content}'`
                  )
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

export default connect(
  null, { castVote, notifyDefault }
)(AnecdoteList)
