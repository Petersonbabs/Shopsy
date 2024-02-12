const mongoose = require("mongoose")
const mongoPassword = process.env.mongoPassword;
let mongoURI = process.env.mongoURI;
mongoURI = mongoURI.replace("<password>", mongoPassword);
const connectToDB = () => {
    mongoose.connect(mongoURI).then(con => {
        console.log("DB connected successfully")
    }).catch(err => {
        console.log("Error occured during DB connectrion", err)
    })

}

module.exports = connectToDB;