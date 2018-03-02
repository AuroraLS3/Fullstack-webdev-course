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

const Statistiikka = () => {
  console.log('Render Statistiikka')
  const palautteita = store.getTotal()
  const state = store.getState()

  console.log(palautteita)

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
            <td>{state.good}</td>
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
            <td>{state.good / palautteita} %</td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    store.subscribe(() => {this.render()})
  }

  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }

  render() {
    console.log(store.getState())
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

export default App;
