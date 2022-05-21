const Order = require("../models/order.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");

exports.createOrder = async (req, res) => {

   // logic to place/create the order

    const orderObj = {
        items: req.body.items,
       zipCode: req.body.zipCode,
       totalCost: req.body.totalCost,
       description : req.body.description,
       customerId: []

    }

    try {
        const user = await User.findOne({
            userType: constants.userTypes.customer,
            userStatus: constants.userStatus.active
        });



        const order = await Order.create(orderObj);
        console.log(order);

        /**
         * order is placed now
         * so i should have to update customer details.
         */

        if(order){
           const user = await User.findOne({
               userId: req.userId
           })
            user.placedOrder.push(order._id);
            const updatedUser = await user.save();

            return res.status(201).send(updatedUser);
        }else{
            throw new Error("Failed to place new order. ");
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server  error"
        })
    }

}

exports.updateOrder = async (req, res) => {

    try{
        const order= await Order.findOne({
            _id: req.params.id
        });

        if (!order) {
            return res.status(400).send({
                message:"Order is not created"
            })
        }

        order.req.body.items != undefined ? req.body.items : order.items;
        order.req.body.zipCode != undefined ? req.body.zipCode : order.zipCode;
        order.req.body.totalCost != undefined ? req.body.totalCost : order.totalCost;



        const updatedOrder = await order.save();

        return res.status(200).send(updatedOrder);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        let queryObj = {};

        if(user.userType == constants.userTypes.customer || user.userType == constants.userTypes.admin){
            queryObj.userId = req.query.customerId;
        }else{
            queryObj.userId = req.userId;
        }

        const orders = await Order.find(queryObj);

        return res.status(200).send(orders);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
}

exports.getOneOrder= async (req, res) => {
    try{

        const order = await Order.findOne({
            _id: req.params.id
        });

        res.status(200).send(order);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.deleteOne({
            _id: req.params.id
        });    

        if (!order) {
            return res.status(400).send({
                message: "No order is created. "
            })
        }

        const user = await User.findOne({
            userId: req.userId
        });

        let removableIndex = user.orders.indexOf(order._id);
        if (removableIndex > -1) {
            user.orders.splice(removableIndex, 1);
        }

        const updatedUser = await user.save();
        res.status(200).send(updatedUser);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
}