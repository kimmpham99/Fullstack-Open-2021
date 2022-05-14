import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddNewBlog from './AddNewBlog'
import userEvent from '@testing-library/user-event'

describe('AddNewBlog test', () => {

  const sampleBlog = {
    likes: 8,
    title: "Test title",
    author: "kimpa",
    url: "http://www.webTest.com",
  }

  test('5.16 - a new blog is created', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<AddNewBlog handleAddBlog={createBlog} />)

    const titleinput = container.querySelector('#title-input')
    await user.type(titleinput, sampleBlog.title)

    const authorinput = container.querySelector('#author-input')
    await user.type(authorinput, sampleBlog.author)

    const urlinput = container.querySelector('#url-input')
    await user.type(urlinput, sampleBlog.url)

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe(sampleBlog.title)
    expect(createBlog.mock.calls[0][1]).toBe(sampleBlog.author)
    expect(createBlog.mock.calls[0][2]).toBe(sampleBlog.url)
  })
})
