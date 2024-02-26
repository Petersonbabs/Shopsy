const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
// const multer = require('multer')
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const errorHandler = require("./middlewares/error");
const app = express();

// const storage = multer.diskStorage({

//     destination: function (req, file, callback) {
//         callback(null, '/src/');

//     },

//     filename: function (req, file, callback) {
//         callback(null, file.fieldname);
//     }
// });

// const upload = multer({ storage: 'storage' });

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))



// app.post('/api/v1/upload', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         console.log("No file received");
//         return res.send({
//             success: false
//         });

//     } else {
//         console.log('file received');
//         return res.send({
//             success: true
//         })
//     }
// });

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


app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "error",
        message: `${req.method} ${req.originalUrl} is not found on this server`
    })
    next()
})


// Error handling
app.use(errorHandler);
module.exports = app;