/**
 * This file will contain the logic for signup/registration, signin
 */

const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); 
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')


/**
 * Controller for Signup
 */

exports.signup = async (req, res) =>{
    //Logic for how the signup will happen

    const userObjToBeStoredInDb = {
        name :req.body.name,
        userId : req.userId,
        email : req.body.email,
        userType : req.body.userType,
        address : req.body.address,
        password: bcrypt.hashSync(req.body.password,8),
    };
        
    
           /**
         * insert the new user in database
         */
    
          try{
    
           const userCreated = await User.create(userObjToBeStoredInDb);
    
           console.log("user created", userCreated);
       
    
           /***
         * Return the response
         */
    
        const userCreationResponse = {
            name: userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            address : userCreated.address,
            createdAt :userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
    
       return res.status(201).send(userCreationResponse);
    
    }catch(err){
        console.error("Error while Signup", err.message);
        return res.status(500).SEND({
            message: "some internal error while Signup"
        });
    }
    

}



/**
 * Controller for Signin
 */


exports.signin = async (req, res) =>{
    
    try{
        
        const user = await User.findOne({userId : req.body.userId});
        
        if(!user){
            return res.status(400).send({
                message : "Failed! userID doesn't exist"
            });
        }
        
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        
        if(!isValidPassword){
            return res.status(401).send({
                message : "Failed! Invalid Password"
            });
        }
        
        /***successful login */
        //  Need to generate access token
        
        const token = jwt.sign({ id: user.userId}, config.secret, {
            expiresIn: 600
        });
        
        const userSigninResponse = {
            name: user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            address : user.address,
            orders : user.orders,
            accessToken : token
        };
        
        //send the response back
        res.status(200).send(userSigninResponse);
    }catch(err){
        console.log(err.message);
        return res.status(500).SEND({
            message: "some internal error while SignIn"
        });
    }
}
    