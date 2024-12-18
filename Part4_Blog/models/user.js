const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    unique: true,
    type: String,
    required: true,
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON',{
  transform: (document, returnObject) => {
    delete returnObject.__v
    delete returnObject._id

    delete returnObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User