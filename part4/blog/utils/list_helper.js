const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsList) => {
  return blogsList.reduce((previous, current) => previous + current.likes, 0)
}

const mostBlogs = (blogsList) => {

  console.log(blogsList.reduce((previous, current) => {
    if (previous.likes > current.likes) {
      return previous
    }
    return current
  }, { likes: 0 }))

  return blogsList.reduce((previous, current) => {
    if (previous.likes > current.likes) {
      return previous
    }
    return current
  }, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
}