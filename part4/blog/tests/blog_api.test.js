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

  const contents = response.body.map(r => r.title)

  //total number check
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  //new post check
  expect(contents).toContain('C')
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

afterAll(() => {
  mongoose.connection.close()
})