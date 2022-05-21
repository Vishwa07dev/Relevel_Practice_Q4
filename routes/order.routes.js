
/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for order

const orderController = require("../controllers/order.controller")

module.exports = (app)=>{
    

    app.post("/OrderingApp/api/v1/orders",  orderController.addOrder);

    // UPDATE CALL
    app.put("/OrderingApp/api/v1/orders/:id", orderController.updateOrder);

    // DELETE CALL
    app.delete("/OrderingApp/api/v1/orders/:id", orderController.deleteOrder);
    
    // GET ALL 
    app.get("/OrderingApp/api/v1/orders", OrderController.getAllOrder);
    
    // GET SINGLE 
    app.get("/OrderingApp/api/v1/orders/:id", orderController.getOneOrder);

}

