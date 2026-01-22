const mongoose = require("mongoose");
const transporter = require("../config/mailSender");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

fileSchema.post("save" , async function(doc){
    try{

        console.log("DOC" , doc);
        let info = await transporter.sendMail({
            from:`UploadFile-by vikas`,
            to:doc.email,
            subject:"New File uploaded on cloudinary",
            html:`<h2> Hell jee!!!</h2> <p>File uploaded View here: <a href="${doc.imageUrl}">doc.imageUrl<a/></p>`,
        })

        console.log("Info" , info);

    }
    catch(error){
        console.error(error);
    }
})


module.exports = mongoose.model("File" , fileSchema);
