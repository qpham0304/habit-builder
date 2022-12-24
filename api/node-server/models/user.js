const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    age: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter your username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)