const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    task: {
      type: String,
      required: [true, 'Please enter a task'],
    },
    completed: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Task', taskSchema)