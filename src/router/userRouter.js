const express = require('express');
const { loginUser, createUser } = require('../controller/userController');

const router = express.Router();

router.post('/login', loginUser);    // Login
router.post('/register', createUser); // Register

module.exports = router;
