
const  order = require("../models/order.model");
const constants = require("../utils/constants");

exports.addOrder = async (req,res) => {

    //order object to store inside database
const orderObject = {
_id: req.body._id,
timeStamp: req.body.timeStamp,
status: req.body.status,
items: req.body.items, 
totalCost: req.body.totalCost,
zipCode: req.body.zipCode,
userId: req.body.userId 
}

try {

// insert object into database
const order = await Order.create (orderObject);
 // console.log(order)
 // return created order
return res.status(201).send(order)

}


}