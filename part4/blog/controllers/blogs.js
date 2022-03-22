const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = request.user
  if (request.user === null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!body.title && !body.url) {
    return response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  const user = request.user
  if (request.user === null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)

    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    await user.save()
    return response.status(204).end()
  }

  response.status(401).json({ error: 'permission denied' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const user = request.user
  if (request.user === null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  const blogToChange = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if (blog.user.toString() === user._id.toString()) {
    const changedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToChange, { new: true })
    return response.json(changedBlog)
  }

  response.status(401).json({ error: 'permission denied' })

})

module.exports = blogsRouter