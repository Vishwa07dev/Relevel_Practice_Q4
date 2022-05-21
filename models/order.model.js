/**
 * This file will contain the schema for Order resource 
 */

const { default: mongoose } = require("mongoose");
const constants = require("../utils/constants");

//creating the mongoose schema

const orderSchema = mongoose.Schema({

    /**
     * This file will contain the following attributes:
     * 
     * _id, 
     * Timestamp ( create | update )
     * Status ( Success | Canceled | Failed )    
     * Items ( [String])
     * TotalCost
     * zipCode
     * userId 
     */

     status: {
        type : String,
        required : true,
        default : constants.orderStatus.success,
        enum : [constants.orderStatus.success, constants.orderStatus.Cancelled, constants.orderStatus.failed]
     },

     items : {
         type : [String],
         required : true
     }, 
     totalCost : {
        type : Number,
        required : true
     },
     zipCode :{
        type : Number,
        required : true
     },
     userId :{
         type : mongoose.SchemaTypes.ObjectId,
         ref : 'User'
     } 
});


exports.module = mongoose.model('Order', orderSchema);
