const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

app.use(cors())
app.use(bodyParser.json())

require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)
const blogRouter = require('./controllers/blogs')

app.use('/api/blogs', blogRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})