import React from 'react'

const Numerot = (props) => {
    const persons = props.persons
    const search = props.search.toLowerCase()

    const getParts = (search) => {
        const result = persons.filter(person => search.length === 0 || person.name.toLowerCase().includes(search))
        .map((person) => <Person key={person.name} person={person} />)

        if (result.length === 0) {
            return <tr><td>No Results</td><td></td></tr>
        }
        return result
    }

    return <table>
        <thead><tr>
            <th>Nimi</th>
            <th>Numero</th>
            </tr></thead>
            <tbody>
                {getParts(search)}
            </tbody>
            </table>
}

const Person = (props) => {
    const person = props.person

    return <tr><td>{person.name}</td><td>{person.number}</td></tr>
}

export default Numerot