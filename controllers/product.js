const Products = require("../models/product")

// Add new product
const addProduct = async (req, res) =>{
    const userID = req.user.id;
    const {title, description, price} = req.body
    const product = await Products.create({owner: userID, title , description, price})

    if(!product){
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
const getProducts = async (req, res) =>{
    const products = await Products.find().populate("owner")
    
    if(!products){
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
    const {id} = req.params
    const product = await Products.findById(id)

    if(!product){
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


// update product
const updateProduct = async (req, res) => {
    const {id} = req.params
    const product = await Products.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    if(!product){
        res.status(404).json({
            status: "Error",
            message: "An error occured while updating product..",
            
        })
    }

    res.status(200).json({
        status: "Success",
        message: "Product succesfully Updated",
        product
    })

  
}


// delete product
const deleteProduct = async (req, res) => {
    const {id} = req.params
    const deleteProduct = await Products.findByIdAndDelete(id)
    
    if(!deleteProduct){
        res.status(404).json({
            status: "Error",
            message: "An error occured while deleting product.",
            
        })
    }

    res.status(200).json({
        status: "Success",
        message: "Product succesfully deleted",
    })

}

module.exports = {addProduct, getProducts , getProduct, updateProduct, deleteProduct}