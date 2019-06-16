const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const user = require('./routes/user');
const sample = require('./routes/sample');

const app = express(); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());



app.use('/user', user);
app.use('/api', sample);

app.use(function (req, res, next){
    let error = new Error('Not found');
    error.status = 404
    next(error);
});

app.use(function(error, req, res, next){

    res.status(error.status || 500);
    res.send({
        //Notes: need to configure message for production level
        message: error.message,
    })
})


module.exports = app;