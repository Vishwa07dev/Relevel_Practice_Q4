const orderController = require('../controllers/order.controller');

module.exports = (app) =>{


    // POST: 127.0.0.1:8080/orderingApp/api/v1/auth/orders
    app.post("/orderingApp/api/v1/orders", orderController.createOrder);

    //PUt: 127.0.0.1: 8080/orderingApp/api/v1/orders/{id}
    app.put("/orderingApp/api/v1/orders/:id", orderController.updateOrder);


    //GET: 127.0.0.1: 8080/orderingApp/api/v1/orders
    app.get("/orderingApp/api/v1/orders/:id", orderController.getAllOrders);

    //GET: 127.0.0.1: 8080/orderingApp/api/v1/orders/{id}
    app.get("/orderingApp/api/v1/orders/:id", orderController.getOrderById);
    
    //DELETE: 127.0.0.1: 8080/orderingApp/api/v1/orders/{id}
    app.delete("/orderingApp/api/v1/orders/:id", orderController.deleteOrderById);

}


