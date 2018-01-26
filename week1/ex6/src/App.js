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

  hyva = () => () => this.setState({hyva: this.state.hyva + 1});
  neutraali = () => () => this.setState((prevState) => (
    {neutraali: prevState.neutraali + 1}
  ));
  huono = () => () => this.setState({huono: this.state.huono + 1});

  render() {
    const hyva = this.state.hyva
    const neutraali = this.state.neutraali
    const huono = this.state.huono
    return <div>
        <Nappi nimi="Hyvä" funk={this.hyva()} />
        <Nappi nimi="Neutraali" funk={this.neutraali()} />
        <Nappi nimi="Huono" funk={this.huono()} />
        <StatsTitle />
        <p>Hyvä: {hyva}</p>
        <p>Neutraali: {neutraali}</p>
        <p>Huono: {huono}</p>
      </div>
  }
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
