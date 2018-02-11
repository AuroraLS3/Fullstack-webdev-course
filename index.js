const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


const Person = require('./models/person')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(result => {
            res.json(result.map(Person.format))
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id

    Person.findById(id).then(person => {
        if (person) {
            res.json(Person.format(person))
        } else {
            res.status(404).end()
        }
    }).catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndRemove(id).then(result => {
        res.status(204).end()
    }).catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    }

    Person.find({})
        .then(result => {
            const found = result.find(saved => body.name === saved.name)
            if (found) {
                return res.status(400).json({ error: 'name must be unique' })
            }

            new Person({
                name: body.name,
                number: body.number
            }).save().then(result => {
                res.json(Person.format(result))
            }).catch(error => {
                console.log(error)
                res.status(400).send({ error: 'malformatted id' })
            })
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(result => {
            const howMany = result.length
            res.send(
                `<p>
                    Puhelinluettelossa on ${howMany} henkilöä
                </p>
                <p>
                    ${new Date().toUTCString()}
                </p>`
            )
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})