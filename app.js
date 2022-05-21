const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);


mongoose.connect(dbConfig.DB_URL, async () => {
     console.log(`Connecting to MongoDB...`);
     console.log(`Connection Successful`);
});

app.listen(serverConfig.PORT, () => {
    console.log(`Get Fit App listening on port ${serverConfig.PORT}`);
})