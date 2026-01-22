
const File = require("../models/File.js");

exports.localFileUpload = async(req , res) => {
    try{

        // fetch file from request
        const file = req.files.file;        // yaha jo 'file' likha hai postman pe same likhana padega
        console.log("files aa gayi" ,file);



        // create path where file need to be stored on server
        let path = __dirname +"/files/" + Date.now() + `.${file.name.split('.')[1]}`;       // path bata diya kaha store karna hai server ke ander
        console.log("PATH -> " , path);



        // add path to the move function
        file.mv(path , (err) => {          // move function
            console.log(err);
        })



        // create a successful response
        res.json({
            sucess:true,
            message:'Local File Uploadded successfully'
        });


    }
    catch(err){
        console.log(err);
    }
}



function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}



const cloudinary = require("cloudinary").v2;

// async function uploadFileToCloudinary(file , folder){
//     const options = {folder};
//     return await cloudinary.uploader.upload(file.tempFilePath);
// } 

async function uploadFileToCloudinary(file, folder, quality, resourceType = "auto") {
    const options = {
        folder,
        resource_type: resourceType,

    };

    if(quality) options.quality = quality;

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// imageupload ka handler
exports.imageUpload = async (req , res)=> {
    try{

        // data fetch 
        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log(file);

        

        // validation 
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType , supportedTypes)){

            return res.status(400).json({
                success:false,
                message:'File formate not supported',
            })
        }

        // File formate supported hai
        const response = await uploadFileToCloudinary(file , "file_upload");
        console.log(response);



        //db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })



    }
    catch(error){

        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        })
    }
}


// reduce the image and then upload
exports.reduceImageUpload = async (req , res)=> {
    try{

        // data fetch 
        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log(file);

        

        // validation 
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType , supportedTypes)){

            return res.status(400).json({
                success:false,
                message:'File formate not supported',
            })
        }

        // File formate supported hai
        const response = await uploadFileToCloudinary(file , "file_upload" ,300);
        console.log(response);



        //db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })



    }
    catch(error){

        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        })
    }
}



exports.videoUpload = async (req , res)=> {
    try{

        // fetch data from user request Body
        const {name , tags , email} = req.body;


        // access the file
        const file = req.files.videoFile;
        console.log(file);


        //check validations
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type" , fileType);


        // if uploaded fileType not supported
        if(!isFileTypeSupported(fileType ,supportedTypes)){

            res.status(400).json({

                success:false,
                message:'File Format not Supported!'

            })
        }


        // agar uploaded fileType support kar jati hai to
        const response = await uploadFileToCloudinary(file , "file_upload");
        console.log(response);


        //ab database me videoFile ki entry create karo
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url, 
        })

        // agar sab kuch sahi se ho jaye to successful response send kar do

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Uploaded Successfully'
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({

            success:false,
            message: 'Something went wrong!'

        })
    }
}