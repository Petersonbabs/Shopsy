const { getOwnerProducts } = require("../controllers/product");
const { getUsers } = require("../controllers/user");
const { protectRoutes } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").get(getUsers)
router.route("/products/:id").get(getOwnerProducts);
module.exports = router