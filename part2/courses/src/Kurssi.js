import React from 'react'

const Kurssi = (props) => {
    const kurssi = props.kurssi

    const rivit = () => kurssi.osat.map(osa => <Osa  key={osa.id} osa={osa} /> )
    
    const adder = (sum, value) => sum + value;
    const yhteensa = () => kurssi.osat.map(osa => osa.tehtavia).reduce(adder)

    return (
        <div>
            <h2>{kurssi.nimi}</h2>
            <table>
                <thead><tr>
                    <th>Osa</th>
                    <th>Tehtäviä</th>
                </tr></thead>
                <tbody>{rivit()}</tbody>
                <tfoot><tr>
                    <td>Yhteensä</td>
                    <td>{yhteensa()}</td>
                </tr></tfoot>
            </table>
        </div>
    )

}

const Osa = (props) => {
    const osa = props.osa

    return <tr>
        <td>{osa.nimi}</td><td>{osa.tehtavia}</td>
    </tr>
}

export default Kurssi