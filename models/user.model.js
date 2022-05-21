/**
 *  This file will contain user schema 
 */

const mongoose = require('mongoose');
const constants = require('../utils/constant');

const userSchema = new mongoose.Schema({
    /**
     *  name,userId,password,userType[admin | customer]
     * 
     */

    name :{
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        default : constants.userType.customer,
        enum : [constants.userType.admin,constants.userType.customer]
    },
    ordersCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Order"
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

module.exports = mongoose.model("User",userSchema)