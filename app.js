
const mongoose = require("mongoose");
const express = require("express");
const dbConfig = require("./configs/db.config");
const bodyParser = require("body-parser");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const constants = require("./utils/constants");


/**
 * Setup the mongodb connection
 */

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL, async() =>{
  
    console.log("MongoDB is connected successfully. ");


        //Create the admin user

     await User.collection.drop();

        const user = await User.create({
            name: "Vish",
            userId: "admin",
            email: "kankvish7777@gmail.com",
            userType: constants.userTypes.admin,
            password: bcrypt.hashSync("Welcome00123", 8)
        });
        console.log("admin user is created", user);

});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/order.routes')(app);

//Start the express server

app.listen(serverConfig.PORT, ()=>{
    console.log("Application has started on PORT", serverConfig.PORT);
});


