const express = require('express')
const router = express.Router()
const { getImages, uploadForm, postImage, postManyImages, updateImage, deleteImage } = require('../controllers/imageController')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const ImageModel = require('../models/image')

router.get('/view', getImages)
router.get('/upload', uploadForm)

const curDir = path.join(__dirname, '../')
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, `${curDir}/images`)  // path to save image to
  },

  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + '.jpg')
  }
})

const upload = multer({ storage: storage })
router.post('/upload', upload.single('image'), (req, res) => {
  const saveImage = new ImageModel({
      name: req.file.filename,
      image: {
          data: fs.readFileSync(`${curDir}/images/` + req.file.filename),
          contentType: 'image/png'
      },
  })
  saveImage.save()
      .then(() => res.send('image uploaded'))
      .catch(err => console.log(err))
  // res.send('image uploaded')
})

router.put('/:id', updateImage)
router.delete('/:id', deleteImage)

module.exports = router