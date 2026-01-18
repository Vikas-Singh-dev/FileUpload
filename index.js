// app create karana hai
const express = require('express');
const app = express();



// uplode .env file variable in process.env file. PORT find karna hai
require("dotenv").config();
PORT = process.env.PORT ;



// middleware add karna hai
app.use(express.json());    // middleware to parse the json req body
const fileUpload = require("express-fileupload");
app.use(fileUpload());




// db connect karna hai 
const db = require("./config/database.js");
db.connect();

//cloud se add karna hai
const cloudinary = require("./config/cloudinary.js");
cloudinary.cloudinaryConnect();

// api route mount kana hai 

const localFileUpload = require("./routes/fileUplode.js");
app.use("/api/v1/upload/" , localFileUpload);





// activation server
app.listen(PORT , (req , res) => {
    console.log(`App is running at ${PORT} `);
})
