const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.likes) {
        blog.likes = 0
    }

    blog.save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogRouter