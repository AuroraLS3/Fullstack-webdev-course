import React from 'react'

import {
  ListGroupItem,
  Collapse,
  Button
} from 'reactstrap'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: props.blog.likes,
      visible: false
    }
  }

  render = () => {
    const blog = this.props.blog
    const button = this.props.button
    const del = this.props.del

    const info =
      (<div className="info">
        <p>Url: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {this.state.likes} <Button color="success" onClick={() => {
          this.setState({likes: this.state.likes + 1}) 
          button()
        }}>Like</Button></p>
        <p>Added by <b>{blog.user ? blog.user.username : 'Anonymous'}</b></p>
        <Button color="danger" onClick={del}>Delete</Button>
      </div>)

    return (
      <ListGroupItem>
        <div className="title" onClick={() => this.setState({visible: !this.state.visible})}>
          {blog.title} by <b>{blog.author}</b>
        </div>
        <Collapse isOpen={this.state.visible}>
        {info}
        </Collapse>
      </ListGroupItem>
    )
  }
}

export default Blog