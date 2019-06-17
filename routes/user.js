const express = require('express');
const router = express.Router();
const user = require('../controllers').user;
const auth = require('../auth');


router.post('/register', user.register);
router.post('/login', user.login);
router.get('/lookup', auth, user.get);

module.exports = router;