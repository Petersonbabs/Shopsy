const dotenv = require("dotenv").config();
const app = require("./app");
const connectToDB = require("./config/db")

connectToDB()
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})