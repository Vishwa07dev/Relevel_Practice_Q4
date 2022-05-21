const Order = require("../models/order.model");
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");


exports.createOrder = async (req, res) => {

    const orderObjToBeStoredInDB = {
        items: req.body.items,
        totalCost: req.body.totalCost,
        address: req.body.address
    };

    try {

    const user = await User.find({userId: req.userId});

    orderObjToBeStoredInDB.userId = user._id;

    const orderCreated = await Order.create(orderObjToBeStoredInDB);

    if(!orderCreated) {
        return res.status(500).send({message: "Order Created Failed"});
    }

    await user.orders.push(orderCreated._id);

    return res.status(201).send(orderCreated);
    }  catch (err) {
        console.log(err);
        return res.status(500).send({message: "Order Created Failed"});
    }

}

exports.getOrder = async (req, res) => {

    try {
        const orderId = req.params.id;

        const order = await Order.find({orderId: orderId});

        return res.status(200).send(order);
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Order Fetching Failed"});
    }
}

exports.getAllOrders = async (req, res) => {

    const queryObj = {};
    if(req.query.status != undefined) {
        queryObj.status = req.query.status
    }

    try {
         const user = await User.find({userId: req.userId});

         queryObj._id = {
            $in: user.orders 
        }
        const orders = await Order.find(queryObj);

        return res.status(200).send(objectConverter.ticketListResponse(orders));
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Order Fetching Failed"});
    }
}

exports.deleteOrder = async (req, res) => {

    try {
        const order = await Order.findOneAndDelete({
        _id: req.params.id
    });

    if(!order) {
        return res.status(404).send({
            message: "No order found for the given id"
        });
    }

    const user = await User.find({userId:req.userId});

    const orders = user.orders;

    const index = orders.indexOf(req.params.id);

    user.orders.shift(index, 1);
    
    await user.save();

    return res.status(200).send({
        success: true,
        message: "order has been deleted"
    });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while deleting order"
        });
    }
}  

exports.updateOrder = async (req, res) => {

    try {
        const orderDetails = await Order.find(req.params.id);

            orderDetails.items = req.body.items != undefined ? req.body.items: orderDetails.items;
            orderDetails.address = req.body.address != undefined ? req.body.address : orderDetails.address;
            orderDetails.totalCost = req.body.totalCost != undefined ? req.body.totalCost: orderDetails.totalCost;
            orderDetails.status = req.body.status != undefined ? orderDetails.status : orderDetails.status;
            
            const updatedOrderDetails = await Order.save();

             return res.status(200).send({
                 updatedOrderDetails: updatedOrderDetails
             });
             } catch (err) {
                 console.log(err);
                 return res.status(500).send({
                     message: "Some internal error occurred while updating order details."
                 });
             }

}