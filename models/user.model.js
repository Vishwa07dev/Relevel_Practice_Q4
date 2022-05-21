
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required : true
    },
    orders: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Order"
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        immutable : false,
        default : () => {
            return Date.now();
        }
    },
});

module.exports = mongoose.model("User", userSchema);