import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = {
    title: 'Test title',
    author: 'Kim',
    url: 'https://webTest.com'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.title')
  expect(div).toHaveTextContent(
    'Test title'
  )
})