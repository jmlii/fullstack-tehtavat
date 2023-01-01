import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, handleLike, handleRemove }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} - {blog.author} 
      <button onClick={() => setDetailsVisible(!detailsVisible)}>View</button>
    </div>
    {detailsVisible && <>
      <div>
        {blog.url}
      </div>
      <div>
        Likes {blog.likes} 
        <button onClick={() => handleLike(blog)}>Like</button>
      </div>
      <div>
        Added by {blog.user ? blog.user.name : 'unknown'}
      </div>
      {blog.user && currentUser.username === blog.user.username && <>
        <button onClick={() => handleRemove(blog)}>Remove</button>
      </>}
    </>}
  </div> 
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    author: PropTypes.string,
    likes: PropTypes.any,
    title: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string
    })
  }),
  currentUser: PropTypes.shape({
    username: PropTypes.string
  }),
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog