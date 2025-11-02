const express = require('express');
// const accessValidation = require('../middleware/accessValidation');
const router = express.Router();
const authContoller = require('../controllers/authController');

router.post('/api/login', authContoller.login)

module.exports = router;