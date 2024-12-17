const Note = require('../models/notes')
const User = require('../models/user')

const initialNotes = [
  { content:'HTML is easy',
    important: false,
  },
  { content: 'Browser can execute only JavaScri[t',
    important: true
  },
]

const nonExistingId = async() => {
  const note = new Note({ content: 'willremovethissoon' })
  const savedNote = await note.save() //gets id ONLY at the stage
  await Note.findByIdAndDelete(savedNote._id)

  return savedNote._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
module.exports = {
  initialNotes, nonExistingId, notesInDb,
  usersInDb,
}