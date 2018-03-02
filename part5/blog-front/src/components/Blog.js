import React from 'react'

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

    const info = this.state.visible ? 
      (<div className="info">
        <p>Url: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {this.state.likes} <button onClick={() => {
          this.setState({likes: this.state.likes + 1}) 
          button()
        }}>Like</button></p>
        <p>Added by <b>{blog.user ? blog.user.username : 'Anonymous'}</b></p>
        <button onClick={del}>Delete</button>
      </div>) 
      : null

    return (
      <div className="blog">
        <div className="title" onClick={() => this.setState({visible: !this.state.visible})}>
          {blog.title} by <b>{blog.author}</b>
        </div>
        {info}
      </div>
    )
  }
}

export default Blog