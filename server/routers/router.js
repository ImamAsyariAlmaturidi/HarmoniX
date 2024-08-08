const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const TransactionController = require('../controllers/midtransController')
const authentication  = require('../middlewares/authMiddleware')
const errorHandler = require('../middlewares/errorHandler')
const groqController = require('../controllers/groqController')
router.post('/register', UserController.registerUser) // POST REGISTER USER
router.post('/login', UserController.login) // POST LOGIN
router.post('/login/google', UserController.loginOrRegisterUser) // POST LOGIN WITH GOOGLE OAUTH
router.post('/music', groqController.prompting)
router.use(authentication)
router.get('/subs',  TransactionController.createTransaction) // CREATE TRANSACTION WITH GET METHODE 
router.patch('/subs/update',  TransactionController.updateTransactionStatus) // UPDATE STATUS TRANSACTION


router.use(errorHandler)
module.exports = router