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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}