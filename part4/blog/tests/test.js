const lostHelper = require('../utils/lost_helper')

describe('Test lost_helper', () => {
    const blogs = require('./test_blogs').blogs

    describe('Test Dummy', () => {
        test('dummy is called', () => {
            const blogs = []
            
            const result = lostHelper.dummy(blogs)
            expect(result).toBe(1)
        })  
    })

    describe('Test Blog utilities', () => {
        test('totalLikes is correct', () => {
            const result = lostHelper.totalLikes(blogs)
            expect(result).toBe(36)
        })

        describe('Favorite Blog Test', () => {
            const bestBlog = {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }
    
            test('correct blog returned', () => {
                const result = lostHelper.favoriteBlog(blogs)
                expect(result).toEqual(bestBlog)
            })
        
        })

        describe('Most Blogs Test', () => {
            test('correct author returned', () => {
                const result = lostHelper.mostBlogs(blogs)
                const expected = {
                    author: "Robert C. Martin",
                    blogs: 3
                }
                expect(result).toEqual(expected)
            })
        })

        describe('Most Likes Test', () => {
            test('correct author returned', () => {
                const result = lostHelper.mostBlogs(blogs)
                const expected = {
                    author: "Edsger W. Dijkstra",
                    likes: 17
                }
                expect(result).toEqual(expected)
            })
        })
    })
})

