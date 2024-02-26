const mongoose = require("mongoose");

const product = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product owner is required"],
        ref: "Users"
    },

    image: {
        type: String,
        required: [true, "Please add an image to your product"]

    },

    title: {
        type: String,
        required: [true, "You must add a title for your product"]
    },

    description: {
        type: String,
        min: 30,
        required: [true, "You must add a desceription for your product"]

    },

    price: {
        type: Number,
        required: [true, "You must add a price for your product"]
    }

})


const Products = mongoose.model("Products", product) 

module.exports = Products