const express = require('express');
const accessValidation = require('../middleware/userLoginCheckMiddleware');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/register', userController.registerUser);
router.get('/api/users', accessValidation, userController.allUsers);
router.get('/api/user/:id', accessValidation, userController.readUser);
router.put('/api/user/update/:id', accessValidation, userController.update);
router.delete('/api/user/delete/:id', accessValidation, userController.destroy)

module.exports = router;