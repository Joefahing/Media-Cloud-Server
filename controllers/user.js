const models = require('../models');
const bcrypt = require('bcrypt');
const validator = require('email-validator');

/**
 * Future Goal:
 * Cookie response should application with more configuration
 */

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
    register: (req, res, next) => {

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
                        res.status(200).send(newUser.authJWT());
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
        .catch(err => next(err))
    },

    login: (req, res, next) =>{
        const {email, password} = req.body.user;

        findByEmail(email)
        .then(user => {
            if(!user){
                const error = new Error('Invalid Login');
                error.status = 403;
                next(error);

            }else{
                user.isValidPassword(password)
                .then(result => {
                    if(!result){
                        const error = new Error('Invalid Password');
                        error.status = 403;
                        next(error);
                    }else{
                        res.status(200).send(user.authJWT());
                    }
                })
            }
        })
        .catch(err => next(err) );
    },

    get: (req, res, next) => {
        findByEmail(req.email)
        .then(user => {
            res.status(200).send({
                user: {
                    email: user.email,
                    message: "Sucessfully retrieved data",
                }
            });
        })
        .catch(err => {
            next(err);
        })
    }
}

