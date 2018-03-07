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

export const notify = (message, timeout) => {
  return async (dispatch) => {
    await dispatch({
      type: 'NOTIFY',
      data: {
        notification: message
      }
    })
    setTimeout(() => {
      dispatch({type: 'HIDE'})
    }, timeout * 1000);
  }
}

export const notifyDefault = (message) => {
  return notify(message, 5)
}

export default reducer