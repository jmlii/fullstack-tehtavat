const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when initially some blogs are saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json and all blogs (the right number) are returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('returned blogs have an identifier called id', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('addition of a new blog with valid user authentication', () => {
    let token
    beforeAll(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'tester', passwordHash })
      await user.save()

      const response = await api
        .post('/api/login')
        .send({ username: 'tester', password: 'password' })
      token = response.body.token
    })

    test('succeeds with valid data and the added blog is returned among all blogs', async () => {

      const newBlog = {
        title: 'Testiblogi',
        author: 'Testattava',
        url: 'http://testiblogaus.fi',
        likes: 6,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContainEqual('Testiblogi')
    })

    test('succeeds and the number of likes is set as zero if it is not given', async () => {
      const newBlog = {
        title: 'Blogi josta ei tykätä',
        author: 'Epäonnistuja',
        url: 'http://eikannatatykata.fi',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })

    test('fails with statuscode 400 if no title and url are given', async () => {
      const newBlog = {
        author: 'Epäonnistuja'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('fails with statuscode 401 unauthorized if request has no valid token' , async () => {
      const tokenNull = null
      const newBlog = {
        title: 'Testiblogi',
        author: 'Testattava',
        url: 'http://testiblogaus.fi',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${tokenNull}`)
        .send(newBlog)
        .expect(401)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})