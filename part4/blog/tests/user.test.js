const express = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('test for user', () => {
  //hardcoded data for testing
  const initialUsers = [
    {
      username: "kimpa",
      name: "Kim_Pham",
      password: "kim31051999"
    }
  ]

  //initialize a new user
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(initialUsers[0].password, 10)
    const user = new User(
      {
        username: initialUsers[0].username,
        passwordHash: passwordHash,
        name: initialUsers[0].name
      }
    )

    await user.save()
  })

  //create a mew user
  test('create a new user', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'lamtt14',
      name: 'Lam_Tran',
      password: 'lam28041999',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

    const usernames = usersAtEnd.body.map(userObject => userObject.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})