const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Höttöblogi',
    author: 'Tättärähattu',
    url: 'http://hottoblogi.fi',
    likes: 6,
    user: '61d9834dc6e5e7119440ada5'
  },
  {
    title: 'Kakkuja ja pannukakkuja',
    author: 'Jauhopeukalo',
    url: 'http://kakkumaker.fi',
    likes: 7,
    user: '61d9834dc6e5e7119440ada5'
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}