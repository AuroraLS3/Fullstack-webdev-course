import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogSvc from './services/blogs'

import loginSvc from './services/login'
import BlogCreationForm from './components/BlogCreationForm';
import Menu from './components/Menu';

import {
  Container,
  Button,
  ListGroup,
  Form,
  FormGroup,
  Input
} from 'reactstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      notification: null,
      user: null,
      //
      title: '',
      author: '',
      url: '',
      visible: false
    }
  }

  updateBlogs = () => {
    blogSvc.getAll().then(blogs => {
      this.sortBlogs(blogs)
      this.setState({ blogs })
    })
  }

  sortBlogs = (blogs) => {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')

    if (token && username) {
      this.setState(
        {
          user: {
            token: token,
            username: username
          }
        })
    }

    this.updateBlogs()
  }

  notifyError = (errorMsg) => {
    this.setState({
      notification: errorMsg
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000);
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginSvc.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('username', user.username)
    } catch (error) {
      this.notifyError('Wrong User or Password.')
    }
  }

  logout = () => {
    this.setState({ user: null })
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
  }

  loginForm = () => (
    <div>
      <Notification message={this.state.notification} />

      <Container>
        <h2 className="title">Login</h2>

        <Form onSubmit={this.login}>
          <FormGroup>
            Username:
          <Input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            Password:
          <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <Button color="success" type="submit">login</Button>
        </Form>
      </Container>
    </div>
  )

  postBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      await blogSvc.create(blog)

      this.setState({ title: '', author: '', url: '', visible: false })

      this.notifyError('Blog was added successfully!')

      await this.updateBlogs()
    } catch (error) {
      this.notifyError('Error occurred: ' + error)
    }
  }

  changeBlogFormVisibility = (visible) => {
    this.setState({ visible: visible })
  }

  likeBlog = (blog) => async () => {
    let updatedBlog = {
      _id: blog._id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogSvc.update(updatedBlog)
  }

  deleteBlog = (blog) => async () => {
    try {
      if (window.confirm('Are you sure you want to delete "' + blog.title + '" by ' + blog.author)) {
        await blogSvc.remove(blog)
        this.setState({ blogs: this.state.blogs.filter(b => b._id !== blog._id) })
      }
      this.notifyError('Blog removed successfully!')
    } catch (error) {
      this.notifyError('Error occurred: ' + error)
    }
  }

  blogForm = () => {
    return (
      <div>
        <Notification message={this.state.notification} />

        <Menu
          logout={this.logout}
          username={this.state.user.username}
        />

        <Container>
          <h2>blogs</h2>

          <BlogCreationForm
            visible={this.state.visible}
            visibilityChange={this.changeBlogFormVisibility}
            title={this.state.title}
            author={this.state.author}
            handleChange={this.handleFieldChange}
            handleSubmit={this.postBlog}
            url={this.state.url}
          />

          <br></br>

          <ListGroup>
            {this.state.blogs.map(blog =>
              <Blog
                key={blog._id}
                blog={blog}
                button={this.likeBlog(blog)}
                del={
                  !blog.user
                    || blog.user.username === this.state.user.username
                    ? this.deleteBlog(blog) : undefined
                }
              />
            )}
          </ListGroup>
        </Container>
      </div>
    );
  }

  render() {
    return !this.state.user
      ? this.loginForm()
      : this.blogForm()
  }
}

export default App;
