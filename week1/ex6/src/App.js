import React, { Component } from 'react';
import './App.css';

const PalauteTitle = () => <h1>Anna Palautetta</h1>
const StatsTitle = () => <h1>Statistiikka</h1>

class Stats extends Component {

  constructor() {
    super();
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  hyva = () => () => {
    this.setState({hyva: this.state.hyva + 1});

  }
  neutraali = () => () => {
    this.setState((prevState) => ({neutraali: prevState.neutraali + 1}));

  }
  huono = () => () => {
    this.setState({huono: this.state.huono + 1});
  }
  
  render() {
    return <div>
        <Nappi nimi="Hyvä" funk={this.hyva()} />
        <Nappi nimi="Neutraali" funk={this.neutraali()} />
        <Nappi nimi="Huono" funk={this.huono()} />
        <Statistics state={this.state} />
      </div>
  }
}

const Statistics = (props) => {
  const hyva = props.state.hyva
  const neutraali = props.state.neutraali
  const huono = props.state.huono
  const total = hyva + neutraali + huono

  if (total === 0) {
    return <div><p>Yhtään palautetta ei annettu.</p></div>
  }
  return <div>
    <StatsTitle />
    <table><tbody>
    <Stat text={'Hyvä'} value={hyva}/>
    <Stat text={'Neutraali'} value={neutraali}/>
    <Stat text={'Huono'} value={huono}/>
    <Keskiarvo state={props.state} total={total} />
    <Positiiviset state={props.state} total={total} />
    </tbody></table>
  </div>
}

const Stat = (props) => {
  return <tr><td>{props.text}</td><td>{props.value}</td></tr>
}

const Positiiviset = (props) => {
  const hyva = props.state.hyva
  const total = props.total

  this.laskePositiiviset = () => {
    return total === 0 ? 0 : ((hyva / total) * 100).toFixed(2)
  }

  return <Stat text={"Positiivisia"} value={this.laskePositiiviset()+'%'}/>
}

const Keskiarvo = (props) => {
  const hyva = props.state.hyva
  const huono = props.state.huono
  const total = props.total

  this.laskeKeskiarvo = () => {
    return total === 0 ? 0 : ((hyva - huono) / total).toFixed(2)
  }

  return <Stat text={"Keskiarvo"} value = {this.laskeKeskiarvo()} />
}

const Nappi = (props) => {
  return <button onClick={props.funk}>{props.nimi}</button>
}

class App extends Component {
  render() {
    return (
      <div>
        <PalauteTitle />
        <Stats />
      </div>
    );
  }
}

export default App;
