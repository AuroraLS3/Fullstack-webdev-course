const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const args = process.argv.slice(2)

if (args.length == 0) {
    Person.find({}).then(result => {
        result.forEach(person => {
            const str = `${person.name} ${person.number}`
            console.log(str)
        })
        mongoose.connection.close()
    })
} else if (args.length == 2) {
    const nimi = args[0];
    const numero = args[1];

    const person = new Person({
        name: nimi,
        number: numero
    })

    person.save().then(result => {
        console.log(`lisätään henkilö ${nimi} numero ${numero} luetteloon`)
        mongoose.connection.close()
    })
} else {
    console.log('Anna 2 argumenttia.')
    process.exit(1)
}
