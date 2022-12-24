const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const colors = require('colors')
const cors = require('cors')
// const multer = require('multer')
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
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/users', require('./routes/userRoutes'))
app.use('/tasks', require('./routes/taskRoutes'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/test', (req, res) => {
  res.status(200).send({
    testRes: "some random test stuff"
  })
})

app.post('/test/:id', (req, res) => {
  const { id } = req.params;
  const { testRes } = req.body;
  if(!testRes) {
    res.status(418).send("invalid req")
  }
  res.send({
    testRes: `Some random test stuff: ${id} ${testRes}`
  })
})

app.listen(port, () => console.log(`Server run on port ${port}`))