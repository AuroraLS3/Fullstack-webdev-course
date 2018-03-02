import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from '../components/SimpleBlog'

describe.only('<SimpleBlog />', () => {
    const blog = {
        title: 'TestTitle',
        author: 'TestAuthor',
        likes: 12345
    }
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={undefined} />)

    it('Renders Title', () => {
        const titleDiv = blogComponent.find('.title')

        expect(titleDiv.text()).toContain(blog.title)
    })

    it('Renders Author', () => {
        const titleDiv = blogComponent.find('.title')

        expect(titleDiv.text()).toContain(blog.author)
    })

    it('Renders Likes', () => {
        const likesDiv = blogComponent.find('.likes')

        expect(likesDiv.text()).toContain(blog.likes)
    })
})