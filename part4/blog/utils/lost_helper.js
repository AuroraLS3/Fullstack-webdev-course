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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}