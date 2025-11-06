const express = require('express');
const accessValidation = require('../middleware/userLoginCheckMiddleware');
const router = express.Router();
const authContoller = require('../controllers/authController');

router.post('/api/login', authContoller.login)
// router.post('/api/logout', accessValidation, authContoller.logout)

module.exports = router;