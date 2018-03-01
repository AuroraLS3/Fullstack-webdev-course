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
      error: null,
      user: null
    }
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
    blogSvc.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  notifyError = (errorMsg) => {
    this.setState({
      error: errorMsg
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000);
  }
  
  handleLoginFieldChange = (event) => {
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
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          Password: 
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

  blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>

        <p>Logged in as {this.state.user.username}</p>
        <button onClick={this.logout}>Logout</button>

        <Notification />
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
