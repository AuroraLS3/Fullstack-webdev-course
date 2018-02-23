const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const User = require('../models/user')

const testUsers = require('./test_users')
const utils = require('./test_utils')

beforeAll(async () => {
    await User.remove({})

    await new User(testUsers.initial).save()
})

describe('User API test', () => {

    test('add ok user', async () => {
        const users = await utils.usersInDB()
        const before = users.length

        await api.post('/api/users')
        .send(testUsers.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const result = await utils.usersInDB()
        expect(result.length).toBe(before + 1)
    })

    test('existing user not added', async () => {
        const users = await utils.usersInDB()
        const add = users[0]

        console.log(add)

        const result = await api.post('/api/users')
        .send(add)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'Username is already in use.'})
    })

    test('user with bad pass not added', async () => {
        const result = await api.post('/api/users')
        .send(testUsers.newUser_badPass)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'Password must be at least 3 characters.'})
    })

    test('no adult value defaults to true', async () => {
        const result = await api.post('/api/users')
        .send(testUsers.newUser_noAdult)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        expect(result.body.adult).toBe(true)
    })

    test('false adult value does not default to true', async () => {
        const result = await api.post('/api/users')
        .send(testUsers.newUser_falseAdult)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        expect(result.body.adult).toBe(false)
    })

})

afterAll(() => {
    server.close()
})