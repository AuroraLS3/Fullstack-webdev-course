import React from 'react'

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'

class CreateNew extends React.Component {
    constructor() {
        super()
        this.state = {
            content: '',
            author: '',
            info: ''
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNew({
            content: this.state.content,
            author: this.state.author,
            info: this.state.info,
            votes: 0
        })
        this.props.history.push('/')
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h2>create a new anecdote</h2>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="text" name="content" id="content" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="url">Url for more info</Label>
                        <Input type="url" name="info" id="url" onChange={this.handleChange} />
                    </FormGroup>
                    <Button>Create</Button>
                </Form>
            </Container>
        )
    }
}

export default CreateNew