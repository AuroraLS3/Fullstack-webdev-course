const config = require('./utils/config')

const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const tokenMiddleware = require('./utils/token')

const mongoose = require('mongoose')

const url = config.mongoUrl

mongoose.connect(url)
  .then( () => {
    console.log('Database Established', url)
  })
  .catch( error => {
    console.log(error)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(tokenMiddleware)

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const PORT = config.port

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}