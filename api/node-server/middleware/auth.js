const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]           // get token from header
      const decoded = jwt.verify(token, process.env.JWT_TOKEN) // verify token
      req.user = await UserModel.findById(decoded.id).select('-password') // store query data to req.user to be used in controller
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  if(!token) {
    res.status(401)
    throw new Error('not authorized token')
  }
})

module.exports = { protect }