const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then( () => {
    console.log('Database Established', process.env.MONGODB_URI)
  })
  .catch( error => {
    console.log(error)
  })

app.use(cors())
app.use(bodyParser.json())

const blogRouter = require('./controllers/blogs')

app.use('/api/blogs', blogRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})