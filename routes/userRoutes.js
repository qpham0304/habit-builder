const express = require('express')
const router = express.Router()
const { getUsers, getMe, loginUser, registerUser, updateUser, deleteUser } = require('../controllers/userController')
const { protect } = require('../middleware/auth')

router.get('/', getUsers)
router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/me', protect, getMe)
router.put('/update', protect, updateUser)
router.delete('/:id', deleteUser)

module.exports = router