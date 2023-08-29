const express = require("express")
const { sendMessage ,getMessage } = require("../Controllers/messageController")
const router = express.Router()

router.post('/send',sendMessage)
router.get('/msg/:room_id',getMessage)

module.exports = router