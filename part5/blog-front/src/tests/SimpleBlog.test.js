import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from '../components/SimpleBlog'

describe('<SimpleBlog />', () => {
    const blog = {
        title: 'TestTitle',
        author: 'TestAuthor',
        likes: 12345
    }
    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

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

    it('Calls event handler once when button is pressed', () => {
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')        

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})