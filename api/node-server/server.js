const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/error')
const multer = require('multer')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const connect = await mongoose.connect(process.env.DB_URI)
    console.info('\x1b[33m%s\x1b[0m', `Connected to MongoDB host: ${connect.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
connectDB()

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'images')))
app.use('/users', require('./routes/userRoutes'))
app.use('/tasks', require('./routes/taskRoutes'))
app.use('/images', require('./routes/imageRoutes'))

app.get('/', (req, res) => {
  res.render('index')
})

app.use(errorHandler)
app.listen(port, () => console.log(`Server run on port ${port}`))