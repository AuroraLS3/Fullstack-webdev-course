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
    return [...store, action.data.anecdote]
  }

  if (action.type === 'INIT_ANECDOTES') {
    return [...store, ...action.data]
  }

  return store
}

export const createAnecdote = (content) => {
  const toSave = { content: content, id: getId(), votes: 0 }
  return async (dispatch) => {
    try {
      await anecdoteSvc.addNew(toSave)

      dispatch({
        type: 'CREATE',
        data: {
          anecdote: toSave
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const castVote = (anecdote) => {
  /*store.dispatch(notify(`You voted '${anecdote.content}'`))
  setTimeout(() => store.dispatch(hide()), 5000)*/
  return { type: 'VOTE', id: anecdote.id }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteSvc.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer