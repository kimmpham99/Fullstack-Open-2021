const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsList) => {
  return blogsList.reduce((previous, current) => previous + current.likes, 0)
}

const mostLikes = (blogsList) => {

  return blogsList.reduce((previous, current) => {
    if (previous.likes > current.likes) {
      return {
        title: previous.title,
        author: previous.author,
        likes: previous.likes
      }
    }
    return {
      title: current.title,
      author: current.author,
      likes: current.likes
    }
  }, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}