const orderController = require("../controllers/order.controller");
const {authCheckPoint} = require("../middlewares");


module.exports = (app)=>{
    
    
    app.post("/OrderingApp/api/v1/orders", [authCheckPoint.validateSignInRequest, authCheckPoint.verifyToken, authCheckPoint.isValidUser], orderController.createOrder);

    app.get("/OrderingApp/api/v1/orders/{id}", [authCheckPoint.validateSignInRequest, authCheckPoint.verifyToken, authCheckPoint.isValidOrder], orderController.getOrder);

    app.get("/OrderingApp/api/v1/orders/", [authCheckPoint.validateSignInRequest], orderController.getAllOrders);

    app.put("/OrderingApp/api/v1/orders/{id}", [authCheckPoint.validateSignInRequest, authCheckPoint.isValidOrder], orderController.updateOrder);

    app.delete("/OrderingApp/api/v1/orders", [authCheckPoint.validateSignInRequest, authCheckPoint.isValidOrder], orderController.cancelOrder);
 
}