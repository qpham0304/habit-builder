const mongoose = require('mongoose')

const imageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'Please provide the image name'],
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Image', imageSchema)