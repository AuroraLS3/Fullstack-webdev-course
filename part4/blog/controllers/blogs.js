const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', { username: 1, name: 1, adult: 1 })
    
        res.json(blogs)
    } catch(error) {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
    }
})

router.post('/', async (req, res) => {
    const blog = new Blog(req.body)

    if (!blog.likes) {
        blog.likes = 0
    }

    if (!blog.title) {
        return res.status(400).send({ error: 'no title'})
    }

    if (!blog.author) {
        return res.status(400).send({ error: 'no author'})
    }

    if (!blog.url) {
        return res.status(400).send({ error: 'no url'})
    }

    try {
        const user = await User.findOne()
        blog.user = user._id
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    
        res.status(201).json(savedBlog)
    } catch(error) {
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

module.exports = router