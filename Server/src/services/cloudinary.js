// import pkg from "cloudinary"; 
// const { v2: cloudinary } = pkg;
// import fs from "fs"

// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })

//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         console.log("cloudinary error aaya bhai")
//         return null;
//     }
// }

// above is the previous code 


// this is the new production code (issue solving)
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (fileBuffer, fileMimetype) => {
    try {
        if (!fileBuffer) return null;

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(null);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(fileBuffer);
        });

    } catch (error) {
        console.error("Cloudinary upload failed", error);
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Image deleted successfully:", result);
        return result;

    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return null;
    }
};




export {
    uploadOnCloudinary,
    deleteFromCloudinary
}