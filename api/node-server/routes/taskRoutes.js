const express = require('express')
const router = express.Router()
const { getTasks, postTask, updateTask, deleteTask } = require('../controllers/taskController')
const { protect } = require('../middleware/auth')

router.get('/', protect, getTasks)
router.post('/', protect, postTask)
router.put('/:id', protect, updateTask)
router.delete('/:id', protect, deleteTask)

module.exports = router