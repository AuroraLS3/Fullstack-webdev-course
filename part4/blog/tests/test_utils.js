const Blog = require('../models/blog')

const format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog._id
    }
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