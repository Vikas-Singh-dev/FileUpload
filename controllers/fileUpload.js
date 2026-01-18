
const File = require("../models/File.js");

exports.localFileUpload = async(req , res) => {
    try{

        // fetch file
        const file = req.files.file;
        console.log(file);



        let path = __dirname +"/files/" + Date.now();
        console.log("PATH -> " , path);



          await file.mv(path , (err) => {
            console.log(err);
        })



        res.json({
            sucess:true,
            message:'Local File Uploadded successfully'
        });


    }
    catch(err){
        console.log(err);
    }
}