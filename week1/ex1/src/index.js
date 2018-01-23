import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.count}</p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa nimi={props.o1} count={props.c1} />
            <Osa nimi={props.o2} count={props.c2} />
            <Osa nimi={props.o3} count={props.c3} />
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.count} tehtävää</p>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto o1={osa1} c1={tehtavia1} o2={osa2} c2={tehtavia2} o3={osa3} c3={tehtavia3} />
            <Yhteensa count={tehtavia1 + tehtavia2 + tehtavia3} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)