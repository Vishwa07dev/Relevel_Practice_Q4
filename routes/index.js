
const authRoutes = require('./auth.route')
const orderRoutes = require('./order.route')

module.exports = (app)=>{

    authRoutes(app);
    orderRoutes(app);

}