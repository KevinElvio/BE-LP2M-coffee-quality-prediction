const historyController = require('../controllers/historyController')
const accessValidation = require('../middleware/userLoginCheckMiddleware');
const express = require('express')
const router = express.Router();


router.get('/api/history/:id', accessValidation, historyController.readHistoryController)


module.exports = router;