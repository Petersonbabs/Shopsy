const express = require("express");
const authRoutes = require("./routes/auth")
const app = express();


app.use(express.json())
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Shopsy "
    })
})
app.get("/api/v1", (req, res) => {
    res.status(200).json({
        message: "Welcome to Shopsy API V1"
    })
})

app.use("/api/v1/auth", authRoutes)


app.use("*", (req, res, next) => {
    res.status(404).json({
        status: "error",
        message: `${req.originalUrl} is not found on this server`
    })
    next()
})
module.exports = app;