const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

Person.format = function (person) {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(express.static('build'))

let persons = []

Person.find({})
    .then(result => {
        persons = result.map(Person.format)
        mongoose.connection.close()
    })

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    }

    const found = persons.find(saved => body.name === saved.name)
    if (found) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    new Person({
        name: body.name,
        number: body.number
    }).save().then(result => {
        const saved = Person.format(result)
        persons = persons.concat(saved)
        res.json(saved)
        mongoose.connection.close()
    })
})

app.get('/info', (req, res) => {
    res.send(
        `<p>
            Puhelinluettelossa on ${persons.length} henkilöä
        </p>
        <p>
            ${new Date().toUTCString()}
        </p>`
    )
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})