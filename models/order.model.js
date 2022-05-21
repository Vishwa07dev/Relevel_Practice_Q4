const mongoose = require("mongoose");
const constants = require("../utils/constants");

const orderSchema = new mongoose.Schema({

    /**
     * userId, Timestamp, status, items, totalCost, zipcode, createdAt , updatedAt
     */
    userId  : {
        type : mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    timestamp  : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        default : constants.orderStatus.success,
        enum: [constants.orderStatus.success, constants.orderStatus.cancelled, constants.orderStatus.failed]
    },
    items :{
        type : [String],
        required : true
    },
    totalCost : {
        type : Number,
        required : true
    },
    address: {
        type: String,
        required: true
    },
    zipcode : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    }
});

module.exports = mongoose.model("Order", orderSchema);