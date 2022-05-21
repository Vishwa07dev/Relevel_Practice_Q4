const authRoutes = require("./auth.routes");
const orderRoutes = require("./order.routes");

module.exports = (app) => {
    authRoutes(app),
    orderRoutes(app)
}