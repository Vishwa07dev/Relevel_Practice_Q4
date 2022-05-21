/**
 *  This file contains operations related to Order
 */


const User = require('../models/user.model');
const Order = require('../models/order.model');
const constants = require('../utils/constant');



//creating a order can done by both admin and user
exports.createOrder = async (req, res) => {

    const orderObjToBeStored = {
        user_id: req.userId,
        items: req.body.items,
        totalCost: req.body.totalCost,
        zipcode: req.body.zipcode,
        ordersCreated : []
    }
    try {
        const order = await Order.create(orderObjToBeStored);

        //Getting the user who created the order 
        const user = await User.findOne({
            userId : req.userId
        })

        //adding the order id to user model 
        user.ordersCreated.push(order._id);
        await user.save();

        return res.status(200).send(order);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

//getting all the order can be done by both customer and admin
exports.getAllOrder = async (req, res) => {

    try {
        const user = await User.findOne({ userId : req.userId});

        console.log(user);
        
        //admin will have access to all the order 
        if(user.userType == constants.userType.admin){
            var order = await Order.find();
        }else{
            //customer can only see the order created bny him 
            var order = await Order.find({userId : user._id});
        }
        return res.status(200).send(order);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}


//getting order based on id 
exports.getoneOrder = async (req, res) => {

    try {
        const order = await Order.findOne({
            _id: req.params.id
        })

        const user = await User.findOne({userId : req.userId});

        //checking if vaild request 
        if (order == null) {
            return res.status(404).send({
                message: "No order found by the id provided, please enter valid id"
            })
        }

        //checking if the user is the one who created the order  he is trying to fetch
        if(user.ordersCreated == order._id && user.userType != constants.userType.admin){

            return res.status(400).send({
                message: "user dont have access to other user order"
            })
        }


        return res.status(200).send(order);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

//updateing the order 
exports.updateOrder = async (req, res) => {

    try {
        const order = await Order.findOne({
            _id: req.params.id
        })

        const user  = await User.find({userId : req.userId});

        //checking if vaild request 
        if (order == null) {
            return res.status(404).send({
                message: "No order found by the id provided, please enter valid id"
            })
        }

         //checking if the user is the one who created the order  he is trying to fetch
         if(user.ordersCreated == order._id && user.userType != constants.userType.admin){

            return res.status(400).send({
                message: "user dont have access to other user order"
            })
        }



        //customer can update below fields only 
        order.items = req.body.items != undefined ? req.body.items : order.items;
        order.totalCost = req.body.totalCost != undefined ? req.body.totalCosts : order.totalCost;
        order.zipcode = req.body.zipcode != undefined ? req.body.zipcode : order.zipcode;
        
        

        //only admin can update the status
        if(user.usertype == constants.userType.admin){
            order.status = req.body.status != undefined ? req.body.status : order.status;
            await order.save();
        }

        const updatedOrder = await order.save();

        return res.status(200).send(updatedOrder);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

//just chaing the status of order to cancel 
exports.cancelOrder = async (req, res) => {

    try {

        const order = await Order.find({
            _id: req.params.id
        });

        //checking if vaild request 
        if (order == null) {
            return res.status(404).send({
                message: "No order found by the id provided, please enter valid id"
            })
        }

        //changing the status to cancled 
        order.status = constants.orderStatus.cancled;

        return res.status(200).send(order);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}
