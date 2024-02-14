const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email address'],
        unique: [true, "Email already in use!"],
        trim: true
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    }
})

const Users = mongoose.model("Users", userSchema);

module.exports = Users;