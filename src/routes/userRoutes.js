const express = require('express');
// const accessValidation = require('../middleware/accessValidation');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/register', userController.registerUser);
router.get('/api/users', userController.allUsers);
router.get('/api/user/:id', userController.readUser);
router.put('/api/user/update/:id', userController.update);

module.exports = router;