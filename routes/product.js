const router = require("express").Router()

const {addProduct, getProducts, getProduct, updateProduct, deleteProduct} = require("../controllers/product")
const {protectRoutes } = require("./../middlewares/auth")
// router.route("/addproduct").post(addProduct)
// router.route("/products").get(getProducts)
// router.route("/product/:id").get(getProduct)
// router.route("/product/:id").patch(updateProduct)
// router.route("/product/:id").delete(deleteProduct)

router.route("/").post(protectRoutes, addProduct).get(getProducts)
router.route("/:id").get(getProduct).patch(protectRoutes,updateProduct).delete(protectRoutes,deleteProduct)


module.exports = router