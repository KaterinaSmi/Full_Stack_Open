const notesRouter = require('express').Router()
const Note = require('../models/notes')
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//token is needed to limit notes creation ONLY for authorized users
//isolate token FUNCTION from 'Bearer'
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username:1 , name:1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Invalid ID format' })
  }
  const note = await Note.findById(request.params.id)
  if(!note){
    response.status(404).end()
  }
  response.status(200).json(note)
})

// notesRouter.post('/', async (request, response) => {
//   const { content } = request.body
//   if (!content) {
//     return response.status(400).json({ error: 'Content is required' })
//   }

//   const note = new Note({
//     content,
//     important: request.body.important || false,
//   })

//   const savedNote = await note.save()
//   response.status(201).json(savedNote)
// })

notesRouter.post('/', async (request, response) => {
  const body = request.body
  // if (!mongoose.Types.ObjectId.isValid(body.userId)) {
  //   return response.status(400).json({ error: 'Invalid user ID format' })
  // }
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'User not found' })
  }

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  })
  //we have to save both note and after this prescribe it to the user and put it to a note array
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  // Check if the provided id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Invalid ID format' })
  }
  const deletedNote = await Note.findByIdAndDelete(id)
  if (!deletedNote) {
    return response.status(404).json({ error: 'Note not found' })
  }
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  if (!updatedNote) {
    return response.status(404).json({ error: 'Note not found' })
  }
  response.json(updatedNote)

})

module.exports = notesRouter