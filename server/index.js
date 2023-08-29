const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const userRoute = require('./Routes/UserRoute')
const RoomRoute = require('./Routes/RoomRoute')
const MessageRoute = require('./Routes/MessageRoute')

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoute)
app.use('/api/rooms', RoomRoute)
app.use('/api/message', MessageRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`)
})
const uri = process.env.ATLAS_URI

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection successful'))
  .catch((error) => console.log(error.message))
