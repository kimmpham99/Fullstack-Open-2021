import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog test', () => {

  const sampleBlog = {
    likes: 8,
    title: "Test title",
    author: "kimpa",
    url: "http://www.webTest.com",
  }

  test('5.13 - renders the title and author, but does not render its url or number of likes', () => {
    const component = render(<Blog blog={sampleBlog} />)

    expect(component.container).toHaveTextContent(sampleBlog.title)
    expect(component.container).toHaveTextContent(sampleBlog.author)
    expect(screen.getByText(sampleBlog.likes)).not.toBeVisible()
    expect(screen.getByText(sampleBlog.url)).not.toBeVisible()
  })

  test('5.14 - url and number of likes are shown when the view button is clicked', async () => {
    const component = render(<Blog blog={sampleBlog} />)

    const button = screen.getAllByText("view")
    await userEvent.setup().click(button[0])

    expect(screen.getByText(sampleBlog.likes)).toBeVisible()
    expect(screen.getByText(sampleBlog.url)).toBeVisible()
  })

  test('5.15 - the like button is clicked twice', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    const component = render(<Blog blog={sampleBlog} handleUpdateBlog={mockHandler}/>)

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})