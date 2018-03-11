import React from 'react'
import PropTypes from 'prop-types'

import {
    Collapse,
    Button,
    Form,
    Label,
    Input,
    FormGroup
  } from 'reactstrap'

const BlogCreationForm = (props) => {
    const hideWhenVisible = { display: props.visible ? 'none' : '' }
    const showWhenVisible = { display: props.visible ? '' : 'none' }

    return (
        <div>
            <Collapse isOpen={props.visible}>
                <h3>Create New</h3>
                <Form onSubmit={props.handleSubmit}>
                    <FormGroup>
                    Title: 
                    <Input
                        type="text"
                        name="title"
                        value={props.title}
                        onChange={props.handleChange}
                    />
                    </FormGroup>
                    <FormGroup>
                    Author: 
                    <Input
                        type="text"
                        name="author"
                        value={props.author}
                        onChange={props.handleChange}
                    />
                    </FormGroup>
                    <FormGroup>
                    Url: 
                    <Input
                        type="text"
                        name="url"
                        value={props.url}
                        onChange={props.handleChange}
                    />
                    </FormGroup>
                    <Button color="success" type="submit">Create</Button>
                    <Button color="warning" onClick={e => props.visibilityChange(false)}>Cancel</Button>
                </Form>
            </Collapse>
            <div style={hideWhenVisible}>
                <Button color="success" onClick={e => props.visibilityChange(true)}>Add a Blog</Button>
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