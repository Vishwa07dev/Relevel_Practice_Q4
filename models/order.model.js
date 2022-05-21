
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: [constants.orderStatus.success, constants.orderStatus.cancelled, constants.orderStatus.success],
    },
    items: {
        type: [String],
        required : true
    },
    address: {
        type: [String],
        required: true
    },
    totalCost: {
        type: mongoose.Types.Decimal128,
        required: true
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
        immutable: false,
        default: () => {
            return Date.now();
        }
    },
});

module.exports = mongoose.model("Order", orderSchema);