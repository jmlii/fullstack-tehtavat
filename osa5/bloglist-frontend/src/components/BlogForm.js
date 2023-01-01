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
        <label htmlFor='title-input'>Title</label>
        <input
          type="text"
          value={blogTitle}
          name="Title"
          onChange={handleTitleChange}
          id='title-input'
        />
      </div>
      <div>
        <label htmlFor='author-input'>Author</label>
        <input
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={handleAuthorChange}
          id='author-input'
        />
      </div>
      <div>
        <label htmlFor='url-input'>URL</label>
        <input
          type="url"
          value={blogUrl}
          name="Url"
          onChange={handleUrlChange}
          id='url-input'
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