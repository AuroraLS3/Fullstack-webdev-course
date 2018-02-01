import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Kurssi from './Kurssi.js';

const App = () => {
    const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        },
        {
          nimi: 'Uusi osa',
          tehtavia: 0,
          id: 4
        }
      ]
    },
    {
        nimi: 'Node.js',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          }
        ]
      }
    ]
  
    const getKurssit = () => kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)

    return (
      <div>
        <h1>Kurssit</h1>
        {getKurssit()}
      </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));
