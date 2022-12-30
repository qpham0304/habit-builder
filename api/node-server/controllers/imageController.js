const asyncHandler = require('express-async-handler')
const ImageModel = require('../models/image')
const fs = require('fs')
const multer = require('multer')
const path = require('path')

const getImages = asyncHandler(async (req, res) => {
  res.status(200).render('image')
})

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'images')  // path to save image to
  },

  filename: (req, file, cb) => {
    console.log(file)
    // cb(null, Date.now() + '.jpg')
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const uploadForm = asyncHandler(async (req, res) => {
  res.status(200).render('upload')
})

// const postImage = asyncHandler(async (req, res) => {
  
// })

const postManyImages = asyncHandler(async (req, res) => {
  // res.render('upload')
})

const updateImage = asyncHandler(async (req, res) => {})

const deleteImage = asyncHandler(async (req, res) => {})

module.exports = {
  getImages,
  uploadForm,
  // postImage,
  postManyImages,
  updateImage,
  deleteImage,
}
