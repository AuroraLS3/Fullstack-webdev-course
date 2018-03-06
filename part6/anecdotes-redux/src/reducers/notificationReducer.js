const initialState = {
  notification: null
}

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return { ...store, notification: action.data.notification }
    case 'HIDE':
      return { ...store, notification: null }
    default:
      return store
  }
}

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    data: {
      notification: message
    }
  }
}

export const hide = () => {
  return {
    type: 'HIDE'
  }
}

export default reducer