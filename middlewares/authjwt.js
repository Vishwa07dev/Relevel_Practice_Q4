const  jwt      = require("jsonwebtoken");
const config    = require("../configs/auth.config");
/**
 * Authentication
 *    - if the token is valid or not
 * 
 * 
 * 
 * 1. if no token is passed 
 */



verifyToken = (req, res, next) =>{
    /***
     * read the token from the header
     */
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(400).send({
            message: "No token provided"
        })
    }

    //if the token was provided, we need to verify it

    jwt.verify(token, config.secret, (err, decoded) =>{

    if(err){
        return res.status(401).send({
            message: "Unauthorised"
        });
    }
    // I will try to read the userId from the decoded token and store it in req object
    req.userId = decoded.id;
    next();
    })
}


const authJwt = {
    verifyToken : verifyToken,
};   

module.exports = authJwt;