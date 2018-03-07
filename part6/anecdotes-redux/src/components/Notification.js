import React from 'react'
import PropTypes from 'prop-types'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const message = this.context.store.getState().notification.notification

    if (message === null) {
      return <div></div>
    }

    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

export default Notification
