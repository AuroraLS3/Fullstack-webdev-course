import React from 'react'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      color: 'green'
    }

    const message = this.props.notification

    if (message === null || message.length === 0) {
      return null
    }

    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default Notification
