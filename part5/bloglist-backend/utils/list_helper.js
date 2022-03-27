const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((previous, current) => previous + current.likes, 0)
}

const favoriteBlog = (blogs) => {

  return blogs.reduce((previous, current) => {
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

const mostBlogs = (blogs) => {
  let result = []

  blogs.forEach(blog => {
    if (result.find(object => object.author === blog.author)) {
      result[result.findIndex(object => object.author === blog.author)].blogs += 1
    } else {
      result = result.concat(
        {
          author: blog.author,
          blogs: 1
        }
      )
    }
  })

  return result.reduce((previous, current) => {
    if (previous.likes > current.likes) {
      return {
        author: previous.author,
        blogs: previous.blogs
      }
    }
    return {
      author: current.author,
      blogs: current.blogs
    }
  }, { blogs: 0 })
}

const mostLikes = (blogs) => {
  let result = []

  blogs.forEach(blog => {
    if (result.find(object => object.author === blog.author)) {
      result[result.findIndex(object => object.author === blog.author)].likes += blog.likes
    } else {
      result = result.concat(
        {
          author: blog.author,
          likes: blog.likes
        }
      )
    }
  })

  return result.reduce((previous, current) => {
    if (previous.likes > current.likes) {
      return {
        author: previous.author,
        likes: previous.likes
      }
    }
    return {
      author: current.author,
      likes: current.likes
    }
  }, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  favoriteBlog,
  mostLikes,
}