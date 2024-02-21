const Users = require("./../models/user");
const bcrypt = require('bcryptjs')
const signJWT = require("./../utils/jwt");
const BlacklistTokens = require("../models/tokenBlacklist");

const signup = async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        email,
        password: hashedpassword,
        firstname,
        lastname
    })

    if(!newUser){
        res.status(404).json({
            status: "fail",
            message: "Failed to register new user"
        })
    }
    
    const token = signJWT(newUser._id, newUser.email);
    console.log(token);

    res.status(201).json({
        status: "success",
        messgae: "User created successfully",
        user: newUser,
        token
    })
}



// login

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await Users.findOne({email}).select("+password")
    console.log(user);
    if(!user || !(await bcrypt.compare(password, user.password))){
        res.status(404).json({
            status: "fail",
            message: "Incorrect email or password",
            error: "wrong details"
        })
    }



    

    const token = signJWT(user.id, user.email);
    res.status(200).json({
        status: "success",
        message: "Login successful",
        user,
        token
    })
}

const logout = async (req, res) => {
    const {token} = req.body;
    if(!token){
        res.status(404).json({
            status: "fail",
            message: "Please supply token in request body",
        })
    }

    const blacklistedToken = await BlacklistTokens.create({token})

    if(!blacklistedToken){
        res.status(404).json({
            status: "fail",
            message: "Fail to blacklist token",
        })
    }

    res.status(200).json({
        status: "success",
        message: "Logout successful",
    })
}

module.exports = {signup, login, logout}