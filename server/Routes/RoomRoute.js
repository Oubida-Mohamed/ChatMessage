const express = require("express")

const{createRoom,findRoom,listRooms} = require('../Controllers/roomController')

const router = express.Router();

router.post('/create',createRoom);
router.get('/all',listRooms);
router.get('/find/:id',findRoom);

module.exports = router;