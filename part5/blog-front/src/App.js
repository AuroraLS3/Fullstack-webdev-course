import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogSvc from './services/blogs'

import loginSvc from './services/login'

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
      url: ''
    }
  }

  updateBlogs = () => {
    blogSvc.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')

    if (token && username) {
      this.setState(
        {user: {
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
  
          this.setState({username: '', password: '', user})
          window.localStorage.setItem('token', user.token)
          window.localStorage.setItem('username', user.username)
      } catch (error) {
          this.notifyError('Käyttäjä tai Salasana on väärin.')
      }
  }

  logout = () => {
    this.setState({user: null})
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
  }

  loginForm = () => (
    <div>
      <Notification />

      <h2>Kirjaudu</h2>
  
      <form onSubmit={this.login}>
        <div>
          Username: 
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleFieldChange}
          />
        </div>
        <div>
          Password: 
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
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

      this.setState({title: '', author: '', url: ''})

      this.notifyError('Blog was added successfully!')

      await this.updateBlogs()
    } catch (error) {
      this.notifyError('Error occurred: ' + error)
    }
  }

  newBlogForm = () => {
    return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={this.postBlog}>
        <div>
          Title: 
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleFieldChange}
          />
        </div>
        <div>
          Author: 
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleFieldChange}
          />
        </div>
        <div>
          Url: 
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleFieldChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
    )
  }

  blogForm = () => {
    return (
      <div>
        <h2>Blog App</h2>

        <Notification message={this.state.notification} />

        <p>Logged in as <b>{this.state.user.username}</b></p>
        <button onClick={this.logout}>Logout</button>

        {this.newBlogForm()}
        
        <h2>blogs</h2>

        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
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
