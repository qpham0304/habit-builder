const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')

const curDir = path.join(__dirname, '../')
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, `${curDir}/images`) // path to save image to
  },

  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + '.jpg')
  },
})
const upload = multer({ storage: storage })

module.exports = { upload }
