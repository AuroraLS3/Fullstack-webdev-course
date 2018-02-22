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
        res.status(400).send({ error: 'no author'})
    }

    if (!blog.url) {
        res.status(400).send({ error: 'no url'})
    }

    blog.save()
        .then(result => {
            res.status(201).json(result)
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogRouter