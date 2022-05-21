/**
 *  This file will contain order Schema 
 */

const mongoose = require('mongoose');
const constants = require('../utils/constant');

const orderSchema = new mongoose.Schema({
    /**
     *  timestamp,status,items,totalCost,zipcode,userId
     * 
     */
    userId :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "User"
    },
    items: {
        type: [String],
        required: true
    },
    status : {
        type : String,
        required : true
    },
    totalCost : {
        type : Number,
        required : true
    },
    zipcode : {
        type : Number,
        required : true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model("Order", orderSchema)