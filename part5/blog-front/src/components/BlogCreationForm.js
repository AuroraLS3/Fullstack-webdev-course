import React from 'react'
import PropTypes from 'prop-types'

const BlogCreationForm = (props) => {
    const hideWhenVisible = { display: props.visible ? 'none' : '' }
    const showWhenVisible = { display: props.visible ? '' : 'none' }

    return (
        <div>
            <div style={showWhenVisible}>
                <h3>Create New</h3>
                <form onSubmit={props.handleSubmit}>
                    <div>
                    Title: 
                    <input
                        type="text"
                        name="title"
                        value={props.title}
                        onChange={props.handleChange}
                    />
                    </div>
                    <div>
                    Author: 
                    <input
                        type="text"
                        name="author"
                        value={props.author}
                        onChange={props.handleChange}
                    />
                    </div>
                    <div>
                    Url: 
                    <input
                        type="text"
                        name="url"
                        value={props.url}
                        onChange={props.handleChange}
                    />
                    </div>
                    <button type="submit">Create</button>
                </form>
                <button onClick={e => props.visibilityChange(false)}>Cancel</button>
            </div>
            <div style={hideWhenVisible}>
                <button onClick={e => props.visibilityChange(true)}>Add a Blog</button>
            </div>
        </div>
    )
}

BlogCreationForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default BlogCreationForm