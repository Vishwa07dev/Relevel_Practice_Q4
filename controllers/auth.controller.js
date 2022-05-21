const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const constants = require("../utils/constant");
const config = require("../configs/auth.config");
const jwt = require("jsonwebtoken");
const objectConverter = require('../utils/objectConverter')


/**
 * Controller for signup/registration
 */
exports.signup = async (req, res) => {

    try {
        
        ///How the user sign up will happen
       
        const userObjToBeStoredInDB = {
            name: req.body.name,
            userId: req.body.userId,
            password: bcrypt.hashSync(req.body.password, 8)
        }
        
         // Insert this new user to the db
         

        const user = await User.create(userObjToBeStoredInDB);
        
res.status(201).send(objectConverter.userResponse([user]));
    } catch (err) {
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message: "some internal error while inserting new user"
        })
    }

}
/**
 // Controller for signin
 */
exports.signin = async (req, res) => {

    //Search the user if it exists 
    try {
        var user = await User.findOne({ userId: req.body.userId });
        console.log(user);
    } catch (err) {
        console.log(err.message);
    }
    if (user == null) {
        return res.status(400).send({
            message: "Failed ! User id doesn't exist"
        })
    }

    //User is existing, so now we will do the password matching
const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid Password"
        })
    }

    //** Successfull login */
    //I need to generate access token now
    const token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 6000
    });
//Send the response back

res.status(200).send({
        name: user.name,
        userId: user.userId,
        userType: user.userType,
        createdAt : user.createdAt,
        updatedAt : user.updatedAt,
        accessToken: token
    })

};

