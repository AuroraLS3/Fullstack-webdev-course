const initialState = {
  filter: ''
}

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return { ...store, filter: action.data.filter }
    default:
      return store
  }
}

export const filter = (filter) => {
  return {
    type: 'FILTER',
    data: {
      filter: filter
    }
  }
}

export default reducer