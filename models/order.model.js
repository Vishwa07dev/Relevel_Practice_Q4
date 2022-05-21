
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const orderSchema = new mongoose.Schema({

    customerId: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    items: {
       type: [String],
       required: true
    },
    orderStatus : {
        type: String,
        required: true,
        default: constants.orderStatus.inProgress,
        enum: [constants.orderStatus.inProgress, constants.orderStatus.failed, constants.orderStatus.failed, constants.orderStatus.success]
    },
    totalCost: {
        type: Number,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: ()=>{
            return Date.now();
        }

    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Order", orderSchema);