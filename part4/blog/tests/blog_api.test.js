const express = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

//hardcoded data for testing
const initialBlogs = [
  {
    title: 'A',
    author: 'Kim',
    url: 'web_A',
    likes: 10
  },
  {
    title: 'B',
    author: 'Moc',
    url: 'web_B',
    likes: 15
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

//4.8 - Returns the correct amount of blog posts in the JSON format.
test('number of blog posts are returned as json', async () => {
  const response = await api.get('/api/blogs')

  //check total number of post
  expect(response.body).toHaveLength(initialBlogs.length)
}, 10000)

//4.9 - check id property in response object
test('check id property in response object', async () => {
  const response = await api.get('/api/blogs')

  //check ID property
  response.body.forEach(object => {
    expect(object.id).toBeDefined()
  })
})

//4.10 - creates a new blog post -> verify the total number of blogs is increased by one
test('create a new blog post', async () => {
  const newBlog = {
    title: 'C',
    author: 'Thuy',
    url: 'web_C',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  //total number check
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  //new post check
  expect(titles).toContain('C')
})

//4.11 - blogs without likes -> like = 0
test('if likes property missing -> likes = 0', async () => {
  const newBlog = {
    title: 'D',
    author: 'Hoa',
    url: 'web_D',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const newAddedBlogLikes = response.body[response.body.length - 1].likes

  //likes property check
  expect(newAddedBlogLikes).toBe(0)
})

//4.12 - create new blogs with missing title and url properties -> status 400 Bad Request
test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Tho',
    likes: 25
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

//4.13 - deleting a single blog post resource
test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  //delete first blog post
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)

  const titles = blogsAtEnd.body.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

//4.14 - updating a single blog post
test('updating a blog post', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  //change first blog post
  const blogToChange = blogsAtStart.body[0]

  const changedBlog = {
    title: 'A_changed',
    author: 'Kim_changed',
    url: 'web_A_changed',
    likes: 40
  }

  await api
    .put(`/api/blogs/${blogToChange.id}`)
    .send(changedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  const authors = response.body.map(r => r.author)
  const urls = response.body.map(r => r.url)
  const likes = response.body.map(r => r.likes)

  //changed post check
  expect(titles).toContain('A_changed')
  expect(authors).toContain('Kim_changed')
  expect(urls).toContain('web_A_changed')
  expect(likes).toContain(40)
})

afterAll(() => {
  mongoose.connection.close()
})