const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const config = require('../utils/config')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', { username: 1, name: 1, adult: 1 })

        res.json(blogs)
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
    }
})

router.post('/', async (req, res) => {

    const token = req.token
    const decodedToken = jwt.verify(token, config.secret)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return res.status(401).send({ error: 'Invalid user token' })
    }

    const blog = new Blog(req.body)

    if (!blog.likes) {
        blog.likes = 0
    }

    if (!blog.title) {
        return res.status(400).send({ error: 'no title' })
    }

    if (!blog.author) {
        return res.status(400).send({ error: 'no author' })
    }

    if (!blog.url) {
        return res.status(400).send({ error: 'no url' })
    }

    try {
        blog.user = user._id
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res.status(201).json(savedBlog)
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Error occurred' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)

        res.status(204).end()
    } catch (ex) {
        console.log(ex)
        res.status(400).send({ error: 'malformatted id' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const result = await Blog.findById(req.params.id)

        res.status(200).send(result)
    } catch (ex) {
        console.log(ex)
        res.status(400).send({ error: 'malformatted id' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const body = req.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        if (!blog.title) {
            return res.status(400).send({ error: 'no title' })
        }
        if (!blog.author) {
            return res.status(400).send({ error: 'no author' })
        }
        if (!blog.url) {
            return res.status(400).send({ error: 'no url' })
        }
        if (!blog.likes) {
            return res.status(400).send({ error: 'no likes' })
        }

        const updatedNote = await Blog
            .findByIdAndUpdate(req.params.id, blog, { new: true })

        res.status(200).send(updatedNote)
    } catch (ex) {
        console.log(ex)
        res.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = router