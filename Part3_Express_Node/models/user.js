const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, retObj) => {
    delete retObj._id
    delete retObj.__v
    //the passwordHash should not be revealed
    delete retObj.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User