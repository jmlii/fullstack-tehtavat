import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (  
    <form onSubmit={addBlog}>
      <h2>Add a new blog</h2>
      <div>
        title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={handleTitleChange}
          />
      </div>
      <div>
        author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
      </div>
      <div>
        url
          <input 
            type="url"
            value={blogUrl}
            name="Url"
            onChange={handleUrlChange}
          />
      </div>
      <button type="submit">Add</button>
    </form>
  )

}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm