const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const errorHandler = require("./middlewares/error");
const { upload, dataUri } = require("./middlewares/multer")
const { cloudinaryConfig, uploader } = require("./middlewares/cloudinary")
const app = express();


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use("*", cloudinaryConfig)



app.post('/api/v1/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {

        const name = req.body.name
        const file = dataUri(req).content;

        const result = await uploader.upload(file, {
            folder: "shopsy/productImages"
        })

        return res.status(201).json({
            status: "success",
            data: {
                image: result.secure_url,
                name
            }
        })
    }
});

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