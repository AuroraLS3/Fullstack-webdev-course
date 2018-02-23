const Blog = require('../models/blog')

const format = (blog) => {
    return Blog.format(blog)
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const blogCountInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.length
}

module.exports = {
    format, 
    blogsInDB,
    blogCountInDB
}