const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const app = express();


app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Shopsy"
    })
})

app.get("/api/v1", (req, res) => {
    
    res.status(200).json({
        message: "Welcome to Shopsy API V1"
    })
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", userRoutes)


app.use("*", (req, res, next) => {
    res.status(404).json({
        status: "error",
        message: `${req.method} ${req.originalUrl} is not found on this server`
    })
    next()
})

module.exports = app;