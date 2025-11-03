const historyController = require('../controllers/historyController')
const express = require('express')
const router = express.Router();


router.get('/api/history/:id', historyController.readHistoryController)


module.exports = router;