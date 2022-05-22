const Order = require("../models/order.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");

exports.createOrder = async (req, res) => {

    const user = await User.findOne({
        userId: req.userId
    });

    // prepare order object to store inside database
    const orderObj = {
        customerId: user._id,
        deliveryDate: req.body.deliveryDate,
        status: constants.orderStatus.success,
        items: req.body.items,
        totalCost: req.body.totalCost,
        address: req.body.address,
        zipcode: req.body.zipcode
    }

    try {
        // insert order object into database
        const order = await Order.create(orderObj);
        
        // insert into user orders array
        user.orders.push(order._id);
        await user.save();
        
        // return created order
        return res.status(201).send(order);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

/**
 * GET all orders
 */
exports.getAllOrders = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        const queryObj = {};

        // find all orders
        if(user.userType == constants.userType.customer){
            queryObj.customerId = user._id;
        }

        const orders = await Order.find(queryObj);
        
        // return found hospital
        return res.status(200).send(orders);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

/**
 * GET Single order based on its id
 */
exports.getOneOrder = async (req, res) => {
    try{
        // get order based on id from database
        const order = await Order.findOne({
            _id: req.params.id
        });

        // return found record
        res.status(200).send(order);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * UPDATE order data
 */
exports.updateOrder = async (req, res) => {

    try{
        const order = await Order.findOne({
            _id: req.params.id
        });

        if (order == null) {
            return res.status(400).send({
                message: "Order doesn't exist"
            })
        }
    
        // update respective fields
        order.deliveryDate = req.body.deliveryDate != undefined ? req.body.deliveryDate : order.deliveryDate;
        order.status = req.body.status != undefined ? req.body.status : order.status;    
        order.items = req.body.items != undefined ? req.body.items : order.items;    
        order.totalCost = req.body.totalCost != undefined ? req.body.totalCost : order.totalCost;    
        order.address = req.body.address != undefined ? req.body.address : order.address;       
        order.zipcode = req.body.zipcode != undefined ? req.body.zipcode : order.zipcode;       
    
        // save updated object
        const updatedOrder = await order.save();
    
        // return saved object
        return res.status(200).send(updatedOrder);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

/**
 * Update Order status to Cancelled
 */
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id
        });

        // check whether order is valid or not
        if (order == null) {
            return res.status(400).send({
                message: "Order doesn't exist"
            })
        }

        order.status = constants.orderStatus.cancelled;
        await order.save();
        
        res.status(200).send({
            message : "Order succesfully deleted"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}