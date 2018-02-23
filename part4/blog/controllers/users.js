const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    try {
        const body = req.body
  
        const saltRounds = 10
        const hash = await bcrypt.hash(body.password, saltRounds)
  
        const user = new User({
            username: body.username,
            name: body.name,
            hash
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