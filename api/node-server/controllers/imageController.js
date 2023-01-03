const asyncHandler = require('express-async-handler')
const ImageModel = require('../models/image')
const fs = require('fs')
const path = require('path')

const getImages = asyncHandler(async (req, res) => {
  const image = await ImageModel.findById(req.query.id)
  if(!image){
    res.status(400)
    throw new Error('Image not found')
  }
  else{
    res.writeHead(200, { 'Content-type': 'image/jpg' })
    res.end(image.image.data)
  }
})

const getImages2 = asyncHandler(async (req, res) => {
  const curDir = path.join(__dirname, '../')
  const id = req.query.id
  const img = curDir + `/images/${id}.jpg`
  /*
    fs.access(img, fs.constants.F_OK, (err) => {
    console.log(`image at ${img} does not exist`)
  })
  fs.readFile(img, function (err, content) {
    if (err) {
      res.writeHead(404, { 'Content-type': 'text/html' })
      res.end("<h1>can't find image</h1>")
    } else {
      res.writeHead(200, { 'Content-type': 'image/jpg' })
      res.end(content)
      res.write('<html><body><img src="data:image/jpeg;base64,')
      res.write(Buffer.from(content).toString('base64'));
      res.end('"/></body></html>');
    }
  })
  */

  // const images = ImageModel.find({_id : '63af5fb659076f5739135924'}, (err, items) => {
  //   if(err)
  //     console.log(err)
  //   else {
  //     // res.write('<html><body><img src="data:image/jpeg;base64,')
  //     // res.write(Buffer.from(items[0].image.data).toString('base64'));
  //     // res.end('"/></body></html>');
  //     const b64 = Buffer.from(items[0].image.data).toString('base64')
  //     res.render('image', { images: b64 })
  //   }
  // })

  // const image = await ImageModel.findById(req.query.id)
  // if(!image){
  //   res.status(400)
  //   throw new Error('Image not found')
  // }
  // const b64 = Buffer.from(image.image.data).toString('base64')
  // res.render('image', { images: b64 })
  const images = await ImageModel.find({user: req.user.id})
  const b64 = images.map(image => Buffer.from(image.image.data).toString('base64'))
  const img_id = images.map(image => image._id)
  console.log(images[0]._id)
  // res.render('image', { images: b64 }) // response with a page that contain the list of images
  // res.status(200).json({_id: img_id}) // resonse with an entire list of image objects with meta data 
  res.status(200).json({_id: img_id})
})

const uploadForm = asyncHandler(async (req, res) => {
  res.status(200).render('upload')
})

const postImage = asyncHandler(async (req, res) => {
  const curDir = path.join(__dirname, '../')
  if(!req.user || !req.user.id){
    res.status(401)
    throw new Error('not authorized')
  }
  else{
    const saveImage = new ImageModel({
      user: req.user.id,
      name: req.file.filename,
      image: {
        data: fs.readFileSync(`${curDir}/images/` + req.file.filename),
        contentType: 'image/png',
      },
    })
    saveImage
      .save()
      .then(() => res.send({
        _id: saveImage.id,
        name: saveImage.name,
      }))
      .catch((err) => console.log(err))
    console.log(req.file)
  }
})

const postManyImages = asyncHandler(async (req, res) => {
  // res.render('upload')
})

const updateImage = asyncHandler(async (req, res) => {
  var image = await ImageModel.findById(req.params.id)
  if(!image){
    res.status(400)
    throw new Error('Image not found')
  }
  else{
    image = await ImageModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({
      id: req.params.id,
      name: image.name
    })
  }
})

const deleteImage = asyncHandler(async (req, res) => {
  const image = await ImageModel.findById(req.params.id)
  if(!image){
    res.status(400)
    throw new Error('Image not found')
  }
  await image.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getImages,
  getImages2,
  uploadForm,
  postImage,
  postManyImages,
  updateImage,
  deleteImage,
}
