
/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for Orders

const orderController = require("../controllers/order.controller");
const { authJwt } = require("../middlewares");

module.exports = (app)=>{

    app.post("/deliveryService/api/v1/orders", [authJwt.verifyToken], orderController.createOrder);

    app.put("/deliveryService/api/v1/orders/:id", [authJwt.verifyToken, authJwt.isValidCustomerOrAdmin], orderController.updateOrder);

    app.delete("/deliveryService/api/v1/orders/:id", [authJwt.verifyToken, authJwt.isValidCustomerOrAdmin], orderController.deleteOrder);
    
    app.get("/deliveryService/api/v1/orders", [authJwt.verifyToken], orderController.getAllOrders);
    
    app.get("/deliveryService/api/v1/orders/:id", [authJwt.verifyToken, authJwt.isValidCustomerOrAdmin], orderController.getOneOrder);   
}