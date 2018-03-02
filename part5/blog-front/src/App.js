import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogSvc from './services/blogs'

import loginSvc from './services/login'
import BlogCreationForm from './components/BlogCreationForm';

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
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      this.setState({ blogs })
    })
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
          this.notifyError('Wrong User or Password.')
      }
  }

  logout = () => {
    this.setState({user: null})
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
  }

  loginForm = () => (
    <div>
      <Notification message={this.state.notification} />

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

      this.setState({title: '', author: '', url: '', visible: false})

      this.notifyError('Blog was added successfully!')

      await this.updateBlogs()
    } catch (error) {
      this.notifyError('Error occurred: ' + error)
    }
  }

  changeBlogFormVisibility = (visible) => {
    this.setState({visible: visible})
  }

  reRender = () => {
    this.setState({visible: false})
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
    await this.updateBlogs()
    this.reRender()
  }

  deleteBlog = (blog) => async () => {
    try {
      if (window.confirm('Are you sure you want to delete "'+blog.title+'" by '+blog.author)) {
        await blogSvc.remove(blog)
        this.setState({blogs: this.state.blogs.filter(b => b._id !== blog._id)})
      }
      this.notifyError('Blog removed successfully!')
    } catch (error) {
      this.notifyError('Error occurred: ' + error)
    }
  }

  blogForm = () => {
    return (
      <div>
        <h2>Blog App</h2>

        <Notification message={this.state.notification} />

        <p>Logged in as <b>{this.state.user.username}</b></p>
        <button onClick={this.logout}>Logout</button>

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

        {this.state.blogs.map(blog => 
          <Blog 
            key={blog._id} 
            blog={blog} 
            render={this.reRender} 
            button={this.likeBlog(blog)} 
            del={this.deleteBlog(blog)} 
          />
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
