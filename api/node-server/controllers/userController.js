const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user')

const getUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find()
  res.status(200).json({users})
})

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: '30d'
  })
}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Email or Password is not correct')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('please fill in the missing field')
  }
  const userExists = await UserModel.findOne({email})
  if(userExists) {
    res.status(400)
    throw new Error('user already exist')
  }

  // password hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const newUser = await UserModel.create({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  })

  if(newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id)
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id)
  if(!user) {
    res.status(400)
    throw new Error('User not found')
  }
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, req.body, {new: true})
  res.status(200).send("update succeeded")
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id)
  if(!user) {
    res.status(400)
    throw new Error('User not found')
  }
  await user.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getUsers,
  getMe,
  loginUser,
  registerUser,
  updateUser,
  deleteUser
}