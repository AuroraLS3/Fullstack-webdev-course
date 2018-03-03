import React from 'react';


class App extends React.Component {

  voteAnecdote = (anecdote) => () => {
    const action = {
      type: 'VOTE',
      data: {
        id: anecdote.id
      }
    }

    this.props.store.dispatch(action)
  }

  addAnecdote = (event) => {
    event.preventDefault()

    const form = event.target.anecdote
    const anecdote = form.value
    
    const action = {
      type: 'ADD',
      data: {
        anecdote: anecdote
      }
    }

    this.props.store.dispatch(action)
    form.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              "{anecdote.content}"
            </div>
            <div>
              has {anecdote.votes}&nbsp;
              <button onClick={this.voteAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" type="text"/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App