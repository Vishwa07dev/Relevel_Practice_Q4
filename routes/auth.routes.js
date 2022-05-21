/**
 * This file will act as the route for authentication
 * 
 */

const authController = require("../controllers/auth.controller");
module.exports = (app)=>{
    
    // POST: 127.0.0.1:8080/orderingApp/api/v1/auth/signup
    app.post("/orderingApp/api/v1/auth/signup", authController.signup);

    //Post: 127.0.0.1: 8080/orderingApp/api/v1/auth/signin
    app.post("/orderingApp/api/v1/auth/signin", authController.signin);

}