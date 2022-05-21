/**
 * THis file wiil contain the schema for USER resource
 */
const mongoose = require('mongoose');
const constants = require('../utils/constants');

//creating the mongoose schema
const userSchema = new mongoose.Schema({

    /**
     * This file will contain the following attribues:
     * _id, userId, name, email, userType, password, address, orders
     * 
     */


     name : {
        type: String,
        required: true
    
     }, 
     userId :{
        type : String,
        required :true
     },
     userType :{
        type : String,
        required : true,
        default : constants.userType.customer,
        enum : [constants.userType.customer, constants.userType.admin]
     },
     email :{
        type: String,
        required: true
    
     }, 
     address : {
        type : String,
        required : true
     },
     password : {
      type : String,
      required : true
   },
   orders :{
      type :[mongoose.SchemaTypes.ObjectId],
      ref : "Order"
   },
   createdAt:{
        type: String,
        immutable : True,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type: Date,
        default: ()=>{
               return Date.now();
        }
    
    }
    

});

exports.module = mongoose.model('User', userSchema);