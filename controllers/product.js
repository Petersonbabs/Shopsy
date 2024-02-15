const Products = require("../models/product");
const Users = require("../models/user");
const { getUsers } = require("./user");

// Add new product
const addProduct = async (req, res) => {
    const userID = req.user.id;
    const { title, description, price } = req.body;
    const product = await Products.create({ owner: userID, title, description, price });


    if (!product) {
        res.status(404).json({
            status: "Error",
            message: "An error occured while adding product.",

        })
    }

    res.status(201).json({
        status: "Success",
        message: "Product succesfully added",
        product
    })



}


// Get all products 
const getProducts = async (req, res) => {

    const products = await Products.find().populate("owner")

    if (!products) {
        res.status(404).json({
            status: "Error",
            message: "An error occured while fetching all products.",

        })
    }

    res.status(201).json({
        status: "Success",
        message: "All Products succesfully fetched",
        results: products.length,
        products
    })



}


// get single product
const getProduct = async (req, res) => {
    const { id } = req.params
    const product = await Products.findById(id)

    if (!product) {
        res.status(404).json({
            status: "Error",
            message: "An error occured while fetching product.",

        })
    }

    res.status(201).json({
        status: "Success",
        message: "Product succesfully fetched",
        product
    })
}


// get owners products
const getOwnerProducts = async (req, res) => {
    const userId = req.params.id;
    const products = await Products.find({ owner: userId })

    if (!products) {
        res.status(404).json({
            status: "failed",
            message: "Unable to fetch products for this user"
        })
    }

    res.status(200).json({
        status: "success",
        message: "Owners products fetched successfully!",
        result: products.length,
        products
    })
}



// update product
const updateProduct = async (req, res) => {
    const userID = req.user.id;
    const productId = req.params.id;
    const {title, description, price} = req.body

    const product = await Products.findById(productId);
    
    // if(product.owner.equals(userID))
    if (product.owner.toString() !== userID) {
        res.status(404).json({
            status: "Error",
            message: "You're not authorized to update this product.",

        })
        return
    }

    // product.title = title
    // product.description = description
    // product.price = price

    // await product.save()
    const updatedProduct = await Products.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true
    })


    res.status(200).json({
        status: "Success",
        message: "Product succesfully Updated",
        product: updatedProduct
    })


}


// delete product
const deleteProduct = async (req, res) => {
    const productId  = req.params.id;
    const userID = req.user.id
    
    const product = await Products.findById(productId);


    if (product.owner.toString() !== userID) {
        res.status(404).json({
            status: "Error",
            message: "You're not authorized to delete this product.",

        })
        return
    }
    
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if(!deletedProduct){
        res.status(404).json({
            status: "fail",
            message: "Failed to delete Product"
        })
    }

    res.status(200).json({
        status: "Success",
        message: "Product succesfully deleted",
    })

}

module.exports = { addProduct, getProducts, getProduct, updateProduct, deleteProduct, getOwnerProducts }