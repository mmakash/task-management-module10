const express = require('express');
const UsersController = require('../controller/UserController');
const StudentsController = require('../controller/StudentsController');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthVerifyMiddleware');

router.post('/register', UsersController.registration);
router.post('/login', UsersController.login);

router.get('/profileDetails', AuthMiddleware, UsersController.profileDetails);
router.put('/profileUpdate', AuthMiddleware, UsersController.profileUpdate);
router.get('/recoverVerifyEmail/:email', UsersController.recoverVerifyEmail);
router.post('/recoverVerifyOTP/:email/:otp', UsersController.recoverVerifyOTP);
router.post('/recoverPassword', UsersController.recoverPassword);



module.exports = router;