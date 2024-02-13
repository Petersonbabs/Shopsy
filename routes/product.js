const router = require("express").Router()

const {addProduct, getProducts, getProduct, updateProduct, deleteProduct} = require("../controllers/product")

router.route("/addproduct").post(addProduct)
router.route("/products").get(getProducts)
router.route("/product/:id").get(getProduct)
router.route("/product/:id").patch(updateProduct)
router.route("/product/:id").delete(deleteProduct)

module.exports = router