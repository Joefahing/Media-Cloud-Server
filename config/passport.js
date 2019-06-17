const passport = require('passport');
const LocalStrategy = require('passport-local');
const models = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(username, password, done){

    models.User.findOne({
        where:{
            email: username
        }
    })
    .then(user => {
        if(!user){
            return done(null, false, {message: 'Invalid email'});
        }
        if(!user.isValidPasswordSync(password)){
            return done(null, false, {message: 'Invalid password'});
        }
        return (done, user);
    })
}))