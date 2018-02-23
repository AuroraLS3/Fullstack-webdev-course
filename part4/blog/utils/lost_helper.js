const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total += blog.likes 
    });
    return total;
}

const favoriteBlog = (blogs) => {
    let bestLikes = 0
    let bestBlog

    blogs.forEach(blog => {
        if (blog.likes >= bestLikes) {
            bestBlog = blog
            bestLikes = blog.likes
        }
    })

    return bestBlog
}

const mostBlogs = (blogs) => {
    let authors = {}

    blogs.forEach(blog => {
        const auth = blog.author
        let blogCount = authors[auth]
        if (!blogCount) {
            blogCount = 0
        }
        blogCount++
        authors[auth] = blogCount
    })

    let blogCount = 0
    let bestAuth

    let author
    for (author in authors) {
        const count = authors[author]
        if (count >= blogCount) {
            blogCount = count
            bestAuth = author
        }
    }

    return {
        author: bestAuth,
        blogs: blogCount
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}