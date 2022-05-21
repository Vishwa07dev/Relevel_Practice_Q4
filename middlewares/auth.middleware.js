const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Order = require("../models/order.model");

validateSignupRequest = async (req, res, next) => {
   
    if(!req.body.name) {
        return res.status(400).send({
            message: "Failed ! user name is not provided"
        });
    }
    if(!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "Failed ! Email is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        });
    }

    const user = await User.findOne({userId: req.body.userId});
    console.log(user);
    if(user != null) {
        return res.status(400).send({
            message: "Failed ! User Id already exists"
        });
    }
   
    next(); 
}

validateSignInRequest = (req, res, next) => {
    if(!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! name is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! password is not provided"
        });
    }
    next();
}


verifyToken = (req, res, next) => {

    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }

    console.log("token >>", token);
    //! If the token was provided, we need to verify it against
    jwt.verify(token, Config.secret, (err, decoded) =>{
        if(err) {
            console.log("Token expiredAt", err.expiredAt);
            return res.status(401).send({
                message: "Token expired at " + err.expiredAt + ", please create new token"
            });
        } 
        //! I will try to read the userId from the decoded token and store it in the req.userId property
        req.userId = decoded.id;
        next();
    });
}

isValidUser = async (req, res, next) =>  {


    const user = await User.find({userId: req.userId});

    if(user.userId != req.body.userId) {
        return res.status(403).send("Not a valid user");
    }
    next();

}
isValidOrder = async (req, res, next) =>  {


    const user = await User.find({userId: req.userId});

    const order = await Order.find({_id: req.params.id});

    if(!user.orders.includes(order._id)) {
        return res.status(400).send("Order not found for the given orderId");
    }
    next();
}
const auth = {
    verifyToken: verifyToken,
    validateSignupRequest: validateSignupRequest,
    validateSignInRequest: validateSignInRequest,
    isValidUser: isValidUser,
    isValidOrder: isValidOrder
};


module.exports = auth;