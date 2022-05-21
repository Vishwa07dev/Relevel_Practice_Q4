const express = require('express');
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/server.config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const constants = require('./utils/constants');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));

// connect to the mongoose server
mongoose.connect(dbConfig.DB_URL, ()=>{
    console.log("mongoose is connected")
}, (err) =>{
    console.log("Not connected", err.message);
   //mongoose initialization
});


async function init(){
    var user = await User.findOne({userId : constants.userType.admin});

    if(user){
        return;
    }else {

        // Create the admin user
        const adminUser = await User.create({
            name : 'YUVRAJ',
            userId: 'admin',
            userType : 'constants.userType.admin',
            password : bcrypt.hashSync('welcome0123'),
            Address : "10 Park Street",
            email : 'yuvraj.light@gmail.com'
        });
        console.log('ADMIN user created');
        console.log(adminUser);
    }

}

require('./routes')(app);


//start the express server
app.listen(serverConfig.PORT, ()=> {
    console.log("Application has started on port ", serverConfig.PORT)
});



