/**
 * This file will contain the logi for order resource manipulation
 * and allow a user:
 * 
 * Place an order
 * Update the given order
 * Delete an order
 * Get All Order
 */
const Order = require('../models/order.model');
const User = require('../models/user.model');
const constants = require('../utils/constants');
const objectConverter = require('../utils/objectConverter');

/**
 * create a new Order
 */

exports.createOrder = async (req, res)=>{
    //logic to create a new order\
     
    const orderObj = {

        items : req.body.items, 
        totalCost : req.body.totalCost,
        zipCode : req.body.zipCode,
        userId : req.userId 
    }

    try{

        const order = await Order.create(orderObj);
        
        const user  = await User.findOne({userid : req.userId});
        user.orders.push(order._id);//Insert the orderid in user database
        user.save();

        console.log("Order is placed!")
        return res.status(201).send(orderObj);

    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message :"Some internal Error!"
        });
    }
}

//update the order

exports.updateOrder = async(req, res)=>{

    try{

        const order = Order.findOne({_id : req.body._id});
        
        if(!order){
            return res.status(400).send({
                message :"Order doesn't exist!"
        });
    }

    if(order.userId !== req.userId){
        return res.status(400).send({
            message :"Only authentic user can update!"
        });
    }
    
    //updating the order details
    
        order.items = req.body.items? req.body.items : order.items; 
        order.totalCost = req.body.totalCost ? req.body.totalCost : order.totalCost; 
        order.zipCode = req.body.zipCode ? req.body.zipCode : order.zipCode;

        const updatedOrder = order.save();
        
        return res.status(201).send(updatedOrder);
        
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message :"Some internal Error!"
        });
    
    }
}

/**
 * Get all the order by user
 */

exports.getAllOrders = async (req, res) =>{

     try{

         const orders = await Order.find({userId : req.userId}); 
         
     if(!orders){
        return res.status(400).send({
            message :"No Orders found!"
        });
     }
     
     return res.status(201).send(objectConverter.orderListResponse(orders));

    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message :"Some internal Error!"
        });
    
    }
}


/**
 * get the order by id
 */

exports.getOrderById = async (req, res) =>{
    
    try{

        const order = await Order.find({_id : req.body._id}); 
         
         if(!order){
             return res.status(400).send({
                 message :"Order doesn't exist!"
                });
                
            }
            
            return res.status(201).send(order);
            
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message :"Some internal Error!"
        });
    
    }
}


/**
 * delete an order
 */

 exports.deleteOrderById = async (req, res) =>{
    
    try{

        const order = await Order.find({_id : req.body._id}); 
         
         if(!order){
             return res.status(400).send({
                 message :"Order doesn't exist!"
                });
                
            }
        order.status = constants.orderTypes.cancelled;

        const deletedOrder = order.save();

            return res.status(201).send(deletedOrder);
            
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message :"Some internal Error!"
        });
    
    }
}
