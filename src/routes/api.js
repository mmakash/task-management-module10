const express = require('express');
const UsersController = require('../controller/UserController');
const AuthVarifyMiddlewere = require('../middlewere/AuthVarifyMiddlewere');
const StudentsController = require('../controller/StudentsController');
const router = express.Router();
router.post('/register', UsersController.registration);
router.post('/login', UsersController.login);
router.get('/profile-details',AuthVarifyMiddlewere, UsersController.profileDetails);
router.post('/recover-verify-email/:email',AuthVarifyMiddlewere, UsersController.recoverVerifyEmail);
router.post("/recover-verify-otp/:email/:otp",AuthVarifyMiddlewere, UsersController.recoverVerifyOTP);
router.post('/profile-update',AuthVarifyMiddlewere, UsersController.profileUpdate);

// CRUD students
router.post("/create-students",StudentsController.createStudents);
router.get("/read-all-students",StudentsController.readAllStudents);

module.exports = router;