import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('createBlog function is called with correct details when add button is clicked', async () => {
  const mockCreateBlog = jest.fn()
  const user = userEvent.setup()

  render (<BlogForm createBlog={mockCreateBlog}/>)

  const titleInput = screen.getByLabelText('Title')
  const authorInput = screen.getByLabelText('Author')
  const urlInput = screen.getByLabelText('URL')
  const addButton = screen.getByText('Add')

  await user.type(titleInput, 'Blogging is easy')
  await user.type(authorInput, 'Blogger')
  await user.type(urlInput, 'http://blogeasy.net')
  await user.click(addButton)

  expect(mockCreateBlog).toHaveBeenCalledTimes(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('Blogging is easy')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Blogger')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://blogeasy.net')
})