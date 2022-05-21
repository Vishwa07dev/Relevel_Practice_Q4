const authController = require("../controllers/auth.controller");
const {authCheckPoint} = require("../middlewares");


module.exports = (app)=>{
    
    
    app.post("/OrderingApp/api/v1/auth/signup", [authCheckPoint.validateSignupRequest], authController.signup);

  
    app.post("/OrderingApp/api/v1/auth/signin", [authCheckPoint.validateSignInRequest], authController.signIn);


}