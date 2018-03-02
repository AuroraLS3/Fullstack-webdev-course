const blogs = [
    {
        _id: "5a451df7571c224a31b5c8ce",
        title: "TestTitle",
        author: "TestAuthor",
        url: "TestUrl",
        likes: 12345
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }