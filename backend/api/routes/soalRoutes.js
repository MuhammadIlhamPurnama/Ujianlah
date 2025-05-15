const express = require('express');
const router = express.Router();
const soalController = require('../controllers/soalController');

router.get('/allsoal', soalController.getAllSoal);

module.exports = router;
