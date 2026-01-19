const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("database connect successfully!"))
    .catch((err) => {
        console.log("database connection issue");
        console.error(err);
        process.exit(1);
    })
}