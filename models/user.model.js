/**
 * This file will hold the schema for the User resource
 */

 const mongoose = require("mongoose");
const constants = require("../utils/constants");

 const userSchema = new mongoose.Schema({
 
     /**
      * name, userId, password, email, createdAt , updatedAt
      * userType [ ADMIN |CUSTOMER ] 
      */
     name : {
         type : String,
         required : true
     },
     userId : {
         type : String,
         required : true,
         unique : true
     },
     password :{
         type : String,
         required : true
     },
     email : {
         type : String,
         required : true,
         lowercase : true,
         minLength : 10,
         unqiue : true
     },
     address: {
         type: String,
         required: true
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
     },
     userType : {
         type : String,
         required : true,
         default : constants.userTypes.customer,
         enum : [constants.userTypes.customer, constants.userTypes.admin]
     },
     userStatus : {
         type : String,
         required : true,
         default : constants.userStatus.active,
         enum: [constants.userStatus.active, constants.userStatus.inActive]
     },
     orderDetails: {
         type: [mongoose.SchemaTypes.ObjectId],
         ref: "Order"
     }
    
 });
 
 module.exports = mongoose.model("User", userSchema);