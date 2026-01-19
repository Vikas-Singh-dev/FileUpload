const express = require("express");
const router = express.Router();


// exports all handlers from controllers
const {localFileUpload ,imageUpload} = require("../controllers/fileUpload.js");


// api route
router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);

module.exports = router;
