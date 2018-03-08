import React from 'react'

import { Alert } from 'reactstrap'

class Notification extends React.Component {

  render() {
    const message = this.props.notification

    if (message === null || message.length === 0) {
      return null
    }

    return (
      <Alert color="success">
        {message}
      </Alert>
    )
  }
}

export default Notification
