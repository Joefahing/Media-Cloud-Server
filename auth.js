const jwt = require('jsonwebtoken');
const secret = require('./config/index').JWT_SECRET;

const jwtAuth = (req, res, next) => {
   
    const token = getBearerToken(req);
    const error = new Error('Invalid Token');
    error.status = 401;

    if(token){
        jwt.verify(token, secret, (err, decode)=>{
            if(err){
                next(error);
            }else{
                req.email = decode.email;
                next();
            }
        })
    }else{
        next(error)
    }
}

const getBearerToken = (req) => {
    
    const header = req.headers.authorization;

    if(header){
        if(header.split(' ')[0] === 'bearer' || header.split(' ')[0] === 'token'){
            return header.split(' ')[1];
        }
    }
    return null;
}

module.exports = jwtAuth;