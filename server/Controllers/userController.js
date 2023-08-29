const userModel = require('../Models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const createToken = (_id) => {
  const jwt_key = process.env.JWT_SECRET_KEY

  return jwt.sign({ _id }, jwt_key)
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body

    let user = await userModel.findOne({ email })
    if (!name || !email || !password)
      return res.status(400).json('fields must be required')
    if (user) return res.status(400).json('email already exists')
    if (!validator.isEmail(email))
      return res.status(400).json('email is not valid')
    if (!validator.isLength(name, { min: 3, max: 50 }))
      return res.status(400).json('name is not valid')
    if (!validator.isStrongPassword(password))
      return res.status(400).json('password must be strong')

    if (isAdmin && !['abdellahzine50@gmail.com', 'abdellahzine35@gmail.com','omar@gmail.com'].includes(email)) {
      return res.status(400).json('not authorized to set isAdmin')
    }

    user = new userModel({ name, email, password, isAdmin })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = createToken(user._id)

    res.status(200).json({ _id: user._id, name, email, isAdmin, token })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!email || !password)
      return res.status(400).json('fields must be required')
    if (!user) return res.status(400).json('email or password incorrect')

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword)
      return res.status(400).json('email or password incorrect')

    const token = createToken(user._id)
    res.status(200).json({ _id: user._id, name: user.name, email, token ,isAdmin:user.isAdmin })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const findUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await userModel.findById(id)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const { name, email, password } = req.body
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
      },
      { new: true },
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const deletedUser = await userModel.findByIdAndDelete(id)
    res.json(deletedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  updateUser,
  deleteUser,
}
