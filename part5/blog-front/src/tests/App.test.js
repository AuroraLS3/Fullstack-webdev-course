import React from 'react'
import { mount } from 'enzyme'
import App from '../App'

jest.mock('../services/blogs')

describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    let savedItems = {}

    const localStorageMock = {
        setItem: (key, item) => {
            savedItems[key] = item
        },
        getItem: (key) => savedItems[key],
        clear: savedItems = {}
    }

    window.localStorage = localStorageMock
    
    it('Displays details after clicking the name', () => {
        app.update()
        const login = app.find('.title')

        expect(login.exists()).toBe(true)
        expect(login.text()).toEqual('Login')
    })
})