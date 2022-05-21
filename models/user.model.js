
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({

    /**
     * name, userId, password, email, orders, createdAt , updatedAt
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
        unqiue : true
    },
    userType : {
        type : String,
        default : constants.userType.customer,
        enum: [constants.userType.customer, constants.userType.admin]
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
    orders: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Order"
    }

});

module.exports = mongoose.model("User", userSchema);