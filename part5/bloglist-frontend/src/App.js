import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  //sort blogs based on number of like
  blogs.sort((a, b) => b.likes - a.likes)

  const handleRemoveBlog = async(blog) => {
    try {
      const afterDeleteBlog = await blogService.remove(blog.id)
      setBlogs(blogs.filter(blogObject => blogObject.id !== blog.id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateBlog = async (blog) => {
    try {
      const afterUpdateBlog = await blogService.update(blog, blog.id)
      setBlogs(blogs.map(blogObject => blogObject.id === blog.id ? afterUpdateBlog : blogObject))
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddBlog = async (title, author, url) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const afterAddBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(afterAddBlog))
      setMessage(`a new blog ${title} by ${user.name} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    catch (exception) {
      setMessage('blog add unsuccessfully')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    }

    catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <Login user={user} handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Login user={user} handleLogout={handleLogout} />
      <Togglable buttonLabel="create new blog">
        <AddNewBlog handleAddBlog={handleAddBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlog={handleUpdateBlog}
          handleRemoveBlog={handleRemoveBlog}
        />
      )}
    </div>
  )
}

export default App