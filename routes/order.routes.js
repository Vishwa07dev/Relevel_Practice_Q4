const orderController = require("../controllers/order.controller");
const { authJwt} = require("../middlewares");


module.exports = (app) => {
    app.post("/orderingApp/api/v1/orders",[authJwt.verifyToken],orderController.createOrder);
    
    app.get("/orderingApp/api/v1/orders",[authJwt.verifyToken], orderController.getAllOrders);
    
    app.get("/orderingApp/api/v1/orders/:id" ,[authJwt.verifyToken], orderController.getOneOrder );

    app.put("/orderingApp/api/v1/orders/:id" ,[authJwt.verifyToken], orderController.updateOrder);

    app.delete("/orderingApp/api/v1/orders/:id", [authJwt.verifyToken], orderController.deleteOrder);
}