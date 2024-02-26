const dotEnv = require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
    secure: true
})

const uploadImage = async (filePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true
    }

    try {
        const result = await cloudinary.uploader.upload(filePath, options)
        return result.secure_url;
    } catch (error) {

    }
}


module.exports = {uploadImage}