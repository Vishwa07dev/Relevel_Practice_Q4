const mongoose = require("mongoose");
const constants = require("../utils/constants");

const orderSchema = new mongoose.Schema({


    // userId,items,_id,totalCost,TimeStamp,status,userId,zipCode 
    userId :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "User"
    },
items : {
    type : String,
    required : true
},
_id : {
    type : String,
    required : true
},
totalCost : {
    type : String,
    required : true
},
timeStamp : {
    type : String,
    default : constants.orderTimeStamp.create,
    enum: [constants.orderTimeStamp.create,constants.orderTimeStamp.update]
},
status : {
    type : String,
    default : constants.orderStatus.success,
    enum: [constants.orderStatus.failed, constants.orderStatus.success, constants.orderStatus.cancel]
},
userId : {
    type : String,
    required : true,
    unique : true
},
zipCode : {
    type : Number,
    required : true
},
createAt : {
    type : Date,
    immutable : true,
    default : () => {
        return Date.now();
    }
},
updatedAt : {
    type : Date,
    default : () => {
        return Date.now();
    }
}
});

module.exports = mongoose.model("Order", orderSchema);