const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const Blog = require('../models/blog')

const testBlogs = require('./test_blogs')
const utils = require('./test_utils')

beforeAll(async () => {
    await Blog.remove({})

    const initialBlogs = testBlogs.blogs

    let blogObj
    for (let i = 0; i < initialBlogs.length; i++) {
        blogObj = new Blog(initialBlogs[i])
        await blogObj.save()
    }
})

describe('Test Blogs API', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const currentlyInDB = await utils.blogCountInDB()

        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(currentlyInDB)
    })

    test('blog is added', async () => {
        const before = await utils.blogCountInDB()

        await api.post('/api/blogs')
            .send(testBlogs.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body.length).toBe(before + 1)
        expect(contents).toContain(testBlogs.newBlog.title)
    })

    test('correct blog is added with no likes', async () => {
        const response = await api.post('/api/blogs')
            .send(testBlogs.newBlog_noLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const added = response.body

        expect(added.title).toEqual(testBlogs.newBlog_noLikes.title)
        expect(added.likes).toBe(0)
    })

    test('no blog with undefined title', async () => {
        await api.post('/api/blogs')
            .send(testBlogs.newBlog_noTitle)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('no blog with undefined author', async () => {
        await api.post('/api/blogs')
            .send(testBlogs.newBlog_noAuthor)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('no blog with undefined url', async () => {
        await api.post('/api/blogs')
            .send(testBlogs.newBlog_noUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('blog is deleted', async () => {
        const before = await utils.blogCountInDB()

        const response = await api.post('/api/blogs')
            .send(testBlogs.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let now = await utils.blogCountInDB()

        expect(now).toBe(before + 1)

        const blogs = await utils.blogsInDB()
        const toRemove = blogs[0].id

        await api.delete('/api/blogs/' + toRemove)
            .expect(204)

        now = await utils.blogCountInDB()

        expect(now).toBe(before)
    })

    test('blog is updated', async () => {
        let blogs = await utils.blogsInDB()
        const updateBlog = blogs[0]

        updateBlog.likes = 500

        await api.put('/api/blogs/' + updateBlog.id)
            .send(updateBlog)
            .expect(200)

        blogs = await utils.blogsInDB()
        const updatedBlog = blogs[0]

        expect(updateBlog.likes).toBe(500)
    })
})

afterAll(() => {
    server.close()
})