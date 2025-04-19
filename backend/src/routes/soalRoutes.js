const express = require('express');
const router = express.Router();
const soalController = require('../controllers/soalcontroller');

router.get('/allsoal', soalController.getAllSoal);

module.exports = router;
