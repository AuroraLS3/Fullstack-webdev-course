import React from 'react'

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

export default BlogCreationForm