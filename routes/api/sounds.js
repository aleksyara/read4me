const express = require('express');
const router = express.Router();
const soundsCtrl = require('../../controllers/sounds');

router.post('/', soundsCtrl.processText);

module.exports = router;