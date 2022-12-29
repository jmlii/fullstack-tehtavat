import { useState, useEffect, useRef } from 'react'
import Bloglist from './components/Bloglist'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      console.log('user: ', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        showNotification('Wrong username or password', 'alert')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleAddBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotification('New blog added', 'info')
      })
      .catch(error => {
        showNotification('Something went wrong', 'alert')
      })
  }


  return (
    <div>
      <h1>Blog app</h1>
      <Notification message={notificationMessage} type={notificationType}/>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin} 
          username={username}
          usernameOnChange={({ target }) => setUsername(target.value)}
          password={password}
          passwordOnChange={({ target }) => setPassword(target.value)}
        /> 
        : 
        <div>
          <p><i>{user.name}</i> logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Bloglist 
            blogs={blogs} 
          />
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog}/>
          </Togglable>
        </div>
      }

    </div>
  )
}

export default App
