const asyncHandler = require('express-async-handler')
const TaskModel = require('../models/task')
const UserModel = require('../models/user')

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.find({user: req.user.id})
  res.status(200).json({tasks})
})

const postTask = asyncHandler(async (req, res) => {
  if(!req.body.task) {
    res.status(400)
    throw new Error('object missing required field')
  }
  const task = await TaskModel.create({
    task: req.body.task,
    completed: req.body.completed,
    user: req.user.id,  // user id from logedin user
  })
  res.status(200).json(task)
})

const updateTask = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id)
  if(!user) {
    req.status(401)
    throw new Error('User not found')
  }

  const task = await TaskModel.findById(req.params.id)
  if(task.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Unauthorized user')
  }
  const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedTask)
})

const deleteTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id)
  if(!task){
    res.status(400)
    throw new Error('cannot find task')
  }
  await task.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getTasks,
  postTask,
  updateTask,
  deleteTask
}