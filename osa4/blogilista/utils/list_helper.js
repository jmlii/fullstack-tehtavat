var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = {}
  const reducer = (max, blog) => {
    if (blog.likes > max) {
      max = blog.likes
      favorite = blog
    }
    return max
  }
  blogs.reduce(reducer, 0)
  return favorite
}

const mostBlogs = (blogs) => {
  const amounts = _.map(
    _.countBy(blogs, 'author'), (number, name) => (
      { author: name, count: number })
  )
  const sorted = _.orderBy(amounts, ['count', 'author'], ['desc', 'asc'])
  const most = sorted[0]
  return most.author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}