const express = require('express')
const router = express.Router()
const { getImages, getImages2, uploadForm, postImage, postManyImages, updateImage, deleteImage } = require('../controllers/imageController')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const ImageModel = require('../models/image')
const { upload } = require('../middleware/uploader')
const { protect } = require('../middleware/auth')

router.get('/view', getImages) //TODO: add protected to get request after done testing
router.get('/view2', protect, getImages2)
// router.get('/upload', uploadForm)
router.post('/upload', protect, upload.single('image'), postImage)
router.put('/:id', protect, updateImage)
router.delete('/:id', protect, deleteImage)

module.exports = router