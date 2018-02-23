const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
    try {
        const body = req.body
  
        const saltRounds = 10

        const pass = body.password

        if (!pass || pass.length < 3) {
            return res.status(400).json({ error: 'Password must be at least 3 characters.'})
        }

        const username = body.username
        const found = await User.findOne({ 'username': username})

        if (found) {
            return res.status(400).json({ error: 'Username is already in use.'})
        }

        const hash = await bcrypt.hash(pass, saltRounds)
  
        let adult = body.adult === undefined || body.adult 

        const user = new User({
            username: body.username,
            name: body.name,
            adult: adult,
            password: hash
        })
  
        const savedUser = await user.save()
  
        res.status(201).json(savedUser)
    } catch (ex) {
        console.log(ex)
        res.status(500).json({ error: 'Error occurred' })
    }
})

router.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs')
    res.json(users.map(User.format))
  })

module.exports = router