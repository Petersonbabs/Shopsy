const mongoose = require("mongoose");

const product = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "You must add a title for your product"]
    },

    description: {
        type: String,
        min: 30
    },

    price: {
        type: Number,
        required: [true, "You must add a price for your product"]
    }

})


const Products = mongoose.model("Products", product) 

module.exports = Products