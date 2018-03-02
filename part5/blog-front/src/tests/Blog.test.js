import React from 'react'
import { shallow } from 'enzyme'
import Blog from '../components/Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'TestTitle',
        author: 'TestAuthor',
        url: 'TestUrl',
        likes: 12345
    }
    const mockHandler = jest.fn()

    const blogComponent = shallow(
        <Blog 
            blog={blog} 
            render={jest.fn()}
            button={undefined}
            del={undefined}
        />
    )

    it('Displays details after clicking the name', () => {
        const titleDiv = blogComponent.find('.title')

        const before = blogComponent.find('.info')

        expect(before.exists()).toBe(false)

        titleDiv.simulate('click')
        
        const after = blogComponent.find('.info')

        expect(after.exists()).toBe(true)
    })
})