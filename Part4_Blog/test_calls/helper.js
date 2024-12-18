const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },

  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  }
]

const allBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog ({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const createUserAndLogin = async () => {
  const passwordHash = await bcrypt.hash('password123', 10)

  const user = new User({
    username: 'tester',
    name: 'Test User',
    passwordHash: passwordHash,
  })
  await user.save()

  const response = await api
    .post('/api/login')
    .send({ username: user.username, password: 'password123' })
    .expect(200)
  return { user, token: response.body.token }
}
module.exports = {
  initialBlogs, allBlogs, nonExistingId, usersInDb,
  createUserAndLogin
}
