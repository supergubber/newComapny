const express = require('express')
const {
  getAllUsers,
  registerController,
  loginController
} = require('../controllers/userController')

//router object
const router = express.Router()
//get all user || Get
router.get('/all-users', getAllUsers)
//create user || POST
router.post('/register', registerController)
//create login || post
router.post('/login',loginController)

module.exports = router
