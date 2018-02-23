const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDB = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    format, 
    blogsInDB,
    blogCountInDB,
    usersInDB
}