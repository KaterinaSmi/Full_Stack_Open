const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  //first check the username is exist
  const user = await User.findOne({ username })
  //secon compare the password provided with what we have in db
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(401).json({ error: 'invalid username or password' })
  }
  //create a token for session with limited data
  const userForToken = {
    username: user.username,//access username
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response.status(200).send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter