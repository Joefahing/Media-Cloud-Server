const express = require('express');
const router = express.Router();
const user = require('../controllers').user;


router.post('/register', user.create);
router.post('/login', user.get);
module.exports = router;