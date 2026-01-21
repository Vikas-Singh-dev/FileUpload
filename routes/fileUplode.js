const express = require("express");
const router = express.Router();


// exports all handlers from controllers
const {localFileUpload ,imageUpload, videoUpload , reduceImageUpload} = require("../controllers/fileUpload.js");


// api route
router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/videoUpload" , videoUpload);
router.post("/reduceImageUpload" , reduceImageUpload);
 

module.exports = router;
