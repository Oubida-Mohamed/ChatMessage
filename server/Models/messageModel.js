const mongoose = require('mongoose')

const messageShema = new mongoose.Schema(
  {
    room_id: { type: String },
    sender_id: { type: String },
    message_text: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const messageModel = mongoose.model('messages', messageShema)

module.exports = messageModel
