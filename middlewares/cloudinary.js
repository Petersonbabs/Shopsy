const {config, uploader} = require("cloudinary").v2;

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: process.env.cloudinary_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_api_secret,
        secure: true
      });
      next()
}

module.exports = {cloudinaryConfig, uploader};