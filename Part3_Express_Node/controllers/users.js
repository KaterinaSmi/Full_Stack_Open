const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/', async (request,response) => {
  const users = await User.find({}).populate('notes',{ content:1, important:1 })
  response.status(200).json(users)
})
//posting user
userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  console.log('Received data:', request.body)
  if (!username || !name || !password) {
    return response.status(400).send({ error: 'username, name, and password are required' })
  }

  const saltRounds = 10 //the lower the less secured
  const passwordHash = await bcrypt.hash(password, saltRounds)
  console.log('Generated password hash:', passwordHash) // Debugging log


  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)

})



module.exports = userRouter