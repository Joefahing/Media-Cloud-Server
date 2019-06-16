const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config/index').JWT_SECRET;

const withAuth = (req, res, next) => {
    const token = 
        req.body.token ||
        req.query.token ||
        req.header['x-access-token'] ||
        req.cookies.token;

    if(!token){
        const err =  new Error('Unauthorize: no token');
        err.status = 401;
        next(err);

    }else{
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){
                const err =  new Error('Unauthorize: invalid token');
                err.status = 401;
                next(err)
            }else{
                req.email = decoded.email;
                next()
            }
        })
    }
}

module.exports = withAuth;