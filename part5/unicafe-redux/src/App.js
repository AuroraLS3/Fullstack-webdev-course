import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';

import counterReducer from './store/reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)
store.getTotal = () => {
  const state = store.getState()
  return state.good + state.ok + state.bad
}

const Statistiikka = (props) => {
  console.log('**')
  const palautteita = store.getTotal()
  const state = store.getState()

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(state.good - state.bad) / palautteita}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{state.good * 100.0 / palautteita} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={props.reset}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      s: 0
    }
    store.subscribe(() => {
      this.setState({s: this.state.s+1})
    })
  }

  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }

  render() {
    console.log('*')
    console.log(store.getState())
    console.log(store.getTotal())
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka reset={() => this.klik('ZERO')} />
      </div>
    )
  }
}

export default App;
