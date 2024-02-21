const jwt = require("jsonwebtoken")
const {promisify} = require("util");
const Users = require("../models/user");
const BlacklistTokens = require("../models/tokenBlacklist");

const protectRoutes = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
         res.status(401).json({
            status: "fail",
            message: "You are currently not logged in. Please log in to continue"
        })
        next()
    }

    const blacklistedToken = await BlacklistTokens.findOne({token})
    if(blacklistedToken){
        res.status(401).json({
            status: "fail",
            message: "Invalid token  supplied. Please login again"
        })
    }
    const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);

    const user = await Users.findById(decoded.id).select("-password -__v")

    if(!user){
        res.status(404).json({
            status: "fail",
            message: "Can't find user with the specified token"
        })
        next()
    } 

    req.user = user;
    next()
}

module.exports = {protectRoutes}