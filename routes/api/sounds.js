const express = require('express');
const router = express.Router();
const soundsCtrl = require('../../controllers/sounds');

const multer = require('multer');
const upload = multer();

// /*---------- Public Routes ----------*/
router.post('/', soundsCtrl.processText);


module.exports = router;