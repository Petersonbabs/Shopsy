const multer = require("multer");
const Datauri = require('datauri/parser');
const path = require("path");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//       },
//       filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//       }

// })

// creating a storage with multer
const storage = multer.memoryStorage()

// an upload instance
const upload = multer({ storage: storage });

const dUri = new Datauri();
/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dataUri = (req) => {
    dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
};
module.exports = { upload, dataUri };