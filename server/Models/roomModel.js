const mongoose = require('mongoose')

const roomShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const chatModel = mongoose.model('Room', roomShema)

module.exports = chatModel
