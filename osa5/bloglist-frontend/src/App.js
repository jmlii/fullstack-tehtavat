import { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

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

  const handleAddBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

    blogService.create(newBlog).then(savedBlog => {
      setBlogs(blogs.concat(savedBlog))
    })
    showNotification('New blog added', 'info')
  }

  const showNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType('')
    }, 5000)
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
          <BlogForm 
            handleAddBlog={handleAddBlog}
            title={blogTitle}
            titleOnChange={({ target }) => setBlogTitle(target.value)}
            author={blogAuthor}
            authorOnChange={({ target }) => setBlogAuthor(target.value)}
            url={blogUrl}
            urlOnChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
      }

    </div>
  )
}

export default App
