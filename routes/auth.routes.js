/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const authController = require("../controllers/auth.controller")
const {verifySignUp} = require("../middlewares");


module.exports = (app)=>{
    
    //signup
    app.post("/orderingApp/api/v1/auth/signup",/*[verifySignUp.validateSignUpRequest],*/ authController.signup);

// Login/signin   
    app.post("/orderingApp/api/v1/auth/signin", authController.signin);

}