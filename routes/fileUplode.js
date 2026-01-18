const express = require("express");
const router = express.Router();


// exports all handlers from controllers
const {localFileUpload} = require("../controllers/fileUpload.js");


// api route
router.post("/localFileUpload" , localFileUpload);


module.exports = router;
