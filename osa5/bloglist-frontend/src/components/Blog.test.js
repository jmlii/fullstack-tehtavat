import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Blogging is easy',
  author: 'Blogger',
  url: 'http://blogeasy.net',
  likes: 2,
  user: {
    name: 'Burt Blogreader',
    username: 'burt'
  }
}

const currentUser = {
  name: 'tina Tester',
  username: 'tina'
}

const mockHandleLike = jest.fn()
const mockHandleRemove = jest.fn()

test('renders title and author with hyphen between them', () => {
  render(<Blog blog={blog} currentUser={currentUser}
    handleLike={mockHandleLike} handleRemove={mockHandleRemove}/>)

  const titleAndAuthor = screen.getByText('Blogging is easy - Blogger')

  expect(titleAndAuthor).toBeDefined()
})

test('renders url, likes and user only after clicking the view button', async () => {
  render(<Blog blog={blog} currentUser={currentUser}
    handleLike={mockHandleLike} handleRemove={mockHandleRemove}/>)

  const url = screen.queryByText('http://blogeasy.net')
  const likes = screen.queryByText('Likes 2')
  const userName = screen.queryByText('Added by Burt Blogreader')

  expect(url).toBeNull()
  expect(likes).toBeNull()
  expect(userName).toBeNull()

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(userName).toBeDefined()
})

test('HandleLike function is called twice if like button is clicked twice', async () => {
  render(<Blog blog={blog} currentUser={currentUser}
    handleLike={mockHandleLike} handleRemove={mockHandleRemove}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})

test('remove button is not visible if the blog was not added by the user who is logged in', async () => {
  render(<Blog blog={blog} currentUser={currentUser}
    handleLike={mockHandleLike} handleRemove={mockHandleRemove}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const removeButton = screen.queryByText('Remove')

  expect(removeButton).not.toBeInTheDocument()
})