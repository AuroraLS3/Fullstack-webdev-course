import anecdoteSvc from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    anecdoteSvc.update({ ...voted, votes: voted.votes + 1 })
      .then(result => result)
      .catch(error => {
        console.log(error)
      })

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }

  if (action.type === 'CREATE') {
    const toSave = { content: action.content, id: getId(), votes: 0 }

    anecdoteSvc.addNew(toSave)
      .then(result => result)
      .catch(error => {
        console.log(error)
        return [...store]
      })
    return [...store, toSave]
  }

  if (action.type === 'INIT_ANECDOTES') {
    return [...store, ...action.data]
  }

  return store
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const castVote = (anecdote) => {
  return { type: 'VOTE', id: anecdote.id }
}

export default reducer