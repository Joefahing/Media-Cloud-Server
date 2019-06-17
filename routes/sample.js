const express = require('express');
const router = express.Router();
const withAuth = require('../auth');
const user = require('../controllers').user


/*router.get('/home', (req, res, next)=>{
    res.send({message: "Welcome"});
})

router.get('/secret', withAuth, (req, res, next)=>{
    res.send({message: "Secret is potato"});
});

router.post('/authenticate', user.get);*/


module.exports = router