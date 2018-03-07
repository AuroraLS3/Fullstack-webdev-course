const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content, id: getId(), votes: 0 }]
  }

  if (action.type === 'ADD') {
    return [...store, {
      content: action.data.content,
      id: action.data.id,
      votes: action.data.votes
    }]
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