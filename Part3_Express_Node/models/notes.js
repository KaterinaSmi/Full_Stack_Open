const mongoose = require('mongoose')
require('dotenv').config()

//establishing schema for the note

const noteSchema = new mongoose.Schema({
  content:{
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})
//document is a new instance of a model, in the case const Note = new Note();




module.exports = mongoose.model('Note', noteSchema)