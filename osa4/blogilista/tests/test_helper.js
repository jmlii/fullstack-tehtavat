const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Höttöblogi',
    author: 'Tättärähattu',
    url: 'http://hottoblogi.fi',
    likes: 6,
  },
  {
    title: 'Kakkuja ja pannukakkuja',
    author: 'Jauhopeukalo',
    url: 'http://kakkumaker.fi',
    likes: 7,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}