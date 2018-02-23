const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const User = require('../models/user')

beforeAll(async () => {
    await User.remove({})
})



afterAll(() => {
    server.close()
})