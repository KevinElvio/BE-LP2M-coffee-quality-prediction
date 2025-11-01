const express = require('express');
// const accessValidation = require('../middleware/accessValidation');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/register', userController.registerUser);

module.exports = router;