const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

const config = require('../utils/config')

router.post('/', async (req, res) => {
    const body = req.body
  
    const user = await User.findOne({ username: body.username })
    const isPassCorrect = user === null ?
      false :
      await bcrypt.compare(body.password, user.password)
  
    if ( !(user && isPassCorrect) ) {
      return res.status(401).send({ error: 'Invalid username or password' })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id
    }
  
    const token = jwt.sign(userForToken, config.secret)
  
    res.status(200).send({ token, username: user.username, name: user.name })
  })
  
  module.exports = router