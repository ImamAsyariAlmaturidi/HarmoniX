const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const TransactionController = require('../controllers/midtransController')
const authentication  = require('../middlewares/authMiddleware')
router.post('/register', UserController.registerUser)
router.post('/login', UserController.login)
router.post('/login/google', UserController.loginOrRegisterUser)

router.use(authentication)
router.get('/subs',  TransactionController.createTransaction)
router.patch('/subs/update',  TransactionController.updateTransactionStatus)
module.exports = router