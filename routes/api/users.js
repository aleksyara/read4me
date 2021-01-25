const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
// router.get('/:id', usersCtrl.profile);
router.post('/:id/story', usersCtrl.addStoryToPlaylist);
router.get('/:id/story', usersCtrl.getPlaylist);

/*---------- Protected Routes ----------*/




module.exports = router;