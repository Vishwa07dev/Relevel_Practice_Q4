const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const order = require("../models/order.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");



/**
 * Controller for signup/registration
 */
exports.signup = async (req, res) => {

    try {
        if(req.body.