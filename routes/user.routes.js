/**
 * Define the routes for the User resource
 */

 const userController = require("../controllers/user.controller");
 const { authJwt } = require("../middlewares/authJwt");
 
 
 module.exports = (app) =>{
  /**
  * GET 127.0.0.1:8081/crm/api/v1/users/
  */
   
  app.get("/orderingApp/api/v1/users/",[authJwt.verifyToken, authJwt.isAdmin], userController.findAllUsers);
 
 
 
  app.get("/orderingApp/api/v1/users/:userId",[authJwt.verifyToken], userController.findUserById);
 
 
  
  app.put("/orderingApp/api/v1/users/:userId", [authJwt.verifyToken,authJwt.isAdmin], userController.updateUser);
 
 }