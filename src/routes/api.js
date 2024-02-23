const express = require('express');
const UsersController = require('../controller/UserController');
const StudentsController = require('../controller/StudentsController');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthVerifyMiddleware');

router.post('/register', UsersController.registration);
router.post('/login', UsersController.login);

router.get('/profileDetails', AuthMiddleware, UsersController.profileDetails);


module.exports = router;