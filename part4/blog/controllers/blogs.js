const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

blogRouter.post('/', (req, res) => {
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

    blog.save()
        .then(result => {
            res.status(201).json(result)
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

blogRouter.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        
        res.status(204).end()
    } catch (ex) {
        console.log(ex)
        res.status(400).send({ error: 'malformatted id' })
    }
})

blogRouter.get('/:id', async (req, res) => {
    try {
        const result = await Blog.findById(req.params.id)
        
        res.status(200).send(result)
    } catch (ex) {
        console.log(ex)
        res.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = blogRouter