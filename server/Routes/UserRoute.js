const express = require('express')
const { registerUser, loginUser, findUser, getUsers, updateUser ,deleteUser } = require('../Controllers/userController')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/find/:id',findUser)
router.get('/list',getUsers)
router.put('/update/:id',updateUser)
router.delete('/update/:id',deleteUser)

module.exports = router
