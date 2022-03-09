const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsList) => {
  return blogsList.reduce((previous, current) => previous + current.likes, 0)
}

module.exports = {
  dummy,
  totalLikes,
}