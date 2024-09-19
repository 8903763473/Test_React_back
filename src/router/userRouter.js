const express = require('express');
const { loginUser, createUser, getUserById, getAllUsers } = require('../controller/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);
router.get('/getUserById/:userId', getUserById);
router.get('/getOverAllUsers', getAllUsers);

module.exports = router;
