const BlogForm = ({ handleAddBlog, title, titleOnChange,
  author, authorOnChange, url, urlOnChange }) => (

    <form onSubmit={handleAddBlog}>
      <h2>Add a new blog</h2>
      <div>
        title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={titleOnChange}
          />
      </div>
      <div>
        author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={authorOnChange}
          />
      </div>
      <div>
        url
          <input 
            type="url"
            value={url}
            name="Url"
            onChange={urlOnChange}
          />
      </div>
      <button type="submit">Add</button>
    </form>

)

export default BlogForm