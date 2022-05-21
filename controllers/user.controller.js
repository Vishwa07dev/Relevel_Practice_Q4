/**
 * This file will contain the logic for user resource manpulation 
*/

const User = require('../models/user.model');
const objectConverter = require('../utils/objectConverter');

exports.getUsers = async (req, res) =>{

    const users  = User.find();
    if(!users){
        return res.status(400).send({
            message : "NO user found!"
        });
    }
    return res.status(201).send(objectConverter.userResponse(users)); 

}