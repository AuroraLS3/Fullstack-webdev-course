const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    try {
        const body = req.body
  
        const saltRounds = 10

        const pass = body.password

        if (pass.length < 3) {
            return res.status(400).json({ error: 'Password must be at least 3 characters.'})
        }

        const user = body.username
        const found = await User.findOne({ 'username': user})

        if (found) {
            return res.status(400).json({ error: 'Username is already in use.'})
        }

        const hash = await bcrypt.hash(pass, saltRounds)
  
        const adult = body.adult
        if (adult !== true || adult !== false) {
            adult = true
        }

        const user = new User({
            username: body.username,
            name: body.name,
            adult: adult,
            password: hash
        })
  
        const savedUser = await user.save()
  
        res.json(savedUser)
    } catch (ex) {
        console.log(ex)
        res.status(500).json({ error: 'Error occurred' })
    }
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map(User.format))
  })

module.exports = usersRouter