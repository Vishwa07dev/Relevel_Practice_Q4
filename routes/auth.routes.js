
// define the routes - REST endpoints
const orderController = require("../controllers/order.controller")
const {authJwt} = require('../middleware');
module.exports = (app)=>{
    
    //  POST 127.0.0.1:8081/OrderingApp/api/v1/orders
    app.post(" /OrderingApp/api/v1/orders",[authJwt.verifyToken],orderController.createOrder);
    
    // PUT 127.0.0.1:8081/OrderingApp/api/v1/orders/:id
    app.put("/OrderingApp/api/v1/orders/:id",[authJwt.verifyToken],orderController.updateOrder);
    
    // GET 127.0.0.1:8081/OrderingApp/api/v1/orders
    app.get("/OrderingApp/api/v1/orders",[authJwt.verifyToken],orderController.getAllOrder);
    
    // GET 127.0.0.1:8081/OrderingApp/api/v1/orders/:id
    app.get("/OrderingApp/api/v1/orders/:id",[authJwt.verifyToken],orderController.getoneOrder);
    
    // DELETE 127.0.0.1:8081/OrderingApp/api/v1/orders/:id
    app.delete("/OrderingApp/api/v1/orders/:id",[authJwt.verifyToken],orderController.cancelOrder);

    
}