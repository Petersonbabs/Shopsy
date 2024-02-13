const Products = require("../models/product")

// Add new product
const addProduct = async (req, res) =>{
    const {title, description, price} = req.body
    const product = await Products.create({title , description, price});

    res.status(201).json({
        status: "Success",
        message: "Product succesfully added",
        product
    })

    if(!product){
        res.status(404).json({
            status: "Error",
            message: "An error occured while adding product.",
            
        })
    }

}


// Get all products 
const getProducts = async (req, res) =>{
    
    const products = await Products.find()
    

    products.length == 0 ? res.send("No products found") : res.status(201).json({
        status: "Success",
        message: "All Products succesfully fetched",
        products
    })

    if(!products){
        res.status(404).json({
            status: "Error",
            message: "An error occured while fetching all products.",
            
        })
    }

}


// get single product
const getProduct = async (req, res) => {
    const {id} = req.params
    const product = await Products.findById(id)

    res.status(201).json({
        status: "Success",
        message: "Product succesfully fetched",
        product
    })

    if(!product){
        res.status(404).json({
            status: "Error",
            message: "An error occured while fetching product.",
            
        })
    }
}


// update product
const updateProduct = async (req, res) => {
    const {id} = req.params
    const product = await Products.findByIdAndUpdate(id, req.body)

    res.status(201).json({
        status: "Success",
        message: "Product succesfully Updated",
        product
    })

    if(!product){
        res.status(404).json({
            status: "Error",
            message: "An error occured while updating product..",
            
        })
    }
}


// delete product
const deleteProduct = async (req, res) => {
    const {id} = req.params
    const deleteProduct = await Products.findByIdAndDelete(id)

    res.status(201).json({
        status: "Success",
        message: "Product succesfully deleted",
        deleteProduct
    })

    if(!deleteProduct){
        res.status(404).json({
            status: "Error",
            message: "An error occured while deleting product.",
            
        })
    }
}

module.exports = {addProduct, getProducts , getProduct, updateProduct, deleteProduct}