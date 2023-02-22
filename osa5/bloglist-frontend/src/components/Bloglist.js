import Blog from './Blog'
import PropTypes from 'prop-types'

const Bloglist = ({ blogs, currentUser, handleBlogLike, handleBlogRemove }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        currentUser={currentUser}
        handleLike={handleBlogLike}
        handleRemove={handleBlogRemove}
      />
    )}
  </div>
)

Bloglist.propTypes = {
  blogs: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  handleBlogLike: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired
}

export default Bloglist
