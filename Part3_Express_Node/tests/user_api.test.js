// const { test, after, beforeEach, describe } = require('node:test')
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')
// const assert = require('node:assert')
// const bcrypt = require('bcrypt') //for password hashing
// const User = require('../models/user')
// const helper = require('./test_helper')
// const api = supertest(app)

// describe('when there is initially one user in db', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     const passwordHash = await bcrypt.hash('sekret', 10)
//     const user = new User({ username: 'root', passwordHash })
//     await user.save()
//   })

//   test('creation fails with proper statuscode', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'root',
//       name: 'Superuser',
//       password: 'salainen',
//     }
//     const result = await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert(result.body.error.includes('expected `username` to be unique' ))

//     assert.strictEqual(usersAtEnd.length, usersAtStart.length)
//   })
//   test('creation succeed with a fresh username', async () => {
//     const userAtStart = await helper.usersInDb()
//     console.log(userAtStart)
//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert.strictEqual(usersAtEnd.length, userAtStart.length +1)

//     const usernames = usersAtEnd.map(user => user.username)
//     assert(usernames.includes(newUser.username))
//   })
// })

// after(async () => {
//   await mongoose.connection.close()
// })
