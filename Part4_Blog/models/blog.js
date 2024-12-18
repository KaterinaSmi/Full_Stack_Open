const mongoose = require('mongoose')


const blogShema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  author: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
  },
  likes: {
    type:Number
  },

})

//replacing _id with id
blogShema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Blog = mongoose.model('Blog', blogShema)
module.exports = Blog
