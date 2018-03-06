import React from 'react'

import { filter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange(event) {
    event.preventDefault()
    const newFilter = event.target.value

    this.props.store.dispatch(filter(newFilter))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

export default Filter