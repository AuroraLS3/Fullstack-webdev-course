import React from 'react'
import PropTypes from 'prop-types'

import { filter } from '../reducers/filterReducer'

class Filter extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange(event) {
    event.preventDefault()
    const newFilter = event.target.value

    this.context.store.dispatch(filter(newFilter))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={(event) => {
          this.handleChange.bind(this)
          this.handleChange(event)
        }} />
      </div>
    )
  }
}

Filter.contextTypes = {
  store: PropTypes.object
}

export default Filter