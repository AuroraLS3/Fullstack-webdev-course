const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('<p>No API endpoint in this address.</p>')
})

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Matti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

random = () => {
    return Math.floor(Math.random() * (10000))
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id == id)
    if (person) {
        res.json(person)
    } else  {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons  = persons.filter(person => person.id !== id)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({error: 'name missing'})
    }

    if (body.number === undefined) {
        return res.status(400).json({error: 'number missing'})
    }

    const found = persons.find(saved => body.name === saved.name)
    if (found) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Number(random())
    }
    persons = persons.concat(body)

    res.json(person)
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