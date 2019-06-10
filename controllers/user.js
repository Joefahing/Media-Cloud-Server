const models = require('../models');
const bcrypt = require('bcrypt');
const validator = require('email-validator');

const findByEmail = (email) => {

    return new Promise((resolve) => {
        models.User.findOne({
            where: {
                email
            },
        }).then(user => {
            if(!user){
                resolve(null);
            }else{
                resolve(user);
            }
        })
    })
}

module.exports = {
    create: (req, res, next) => {

        const user = req.body.user;
        findByEmail(user.email)
        .then(result => {
            if(result == null){
                if(!validator.validate(user.email) || user.password.length < 5){
                    const error = new Error("Invalid User Register Request");
                    error.status = 403;
                    next(error);
                }
    
                bcrypt.hash(user.password, 10, (err, hash) => {
                    models.User.create({email: user.email, password: hash})
                    .then(newUser => {
                        res.status(200).send(newUser);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    })
                })
            }else{
                const error = new Error('Email already exist');
                error.status = 403;
                next(error);
            }
        })
    },

    get: (req, res, next) =>{
        const {email, password} = req.body.user;

        findByEmail(email)
        .then(user => {
            if(!user){
                const error = new Error('Invalid Login');
                error.status = 403;
                next(error);

            }else{
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(!result){
                        const error = new Error('Invalid Password');
                        error.status = 403;
                        next(error);
                    }else{
                        res.status(400).send(user);
                    }
                });
            }
        });
        
    }
}

