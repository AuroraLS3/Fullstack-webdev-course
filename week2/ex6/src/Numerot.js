import React from 'react'

const Numerot = (props) => {
    const persons = props.persons
    const search = props.search.toLowerCase()
    const poista = props.poista

    const getParts = (search) => {
        const result = persons.filter(person => search.length === 0 || person.name.toLowerCase().includes(search))
        .map((person) => <Person key={person.name} person={person} poista={poista} />)

        if (result.length === 0) {
            return <tr><td>No Numbers</td><td></td></tr>
        }
        return result
    }

    return <table>
        <thead><tr>
            <th>Nimi</th>
            <th>Numero</th>
            <th>Toiminto</th>
            </tr></thead>
            <tbody>
                {getParts(search)}
            </tbody>
            </table>
}

const Person = (props) => {
    const person = props.person
    const poista = props.poista

    return <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={poista(person)}>Poista</button></td></tr>
}

export default Numerot