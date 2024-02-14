const Users = require("./../models/user");
const bcrypt = require('bcryptjs')
const signJWT = require("./../utils/jwt");

const signup = async (req, res) => {
    const {email, password} = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        email,
        password: hashedpassword
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

    if(!user || !(await bcrypt.compare(password, user.password))){
        res.status(404).json({
            status: "fail",
            message: "Incorrect email or password"
        })
    }
    const token = signJWT(user._id, user.email);
    res.status(200).json({
        status: "success",
        messgae: "Login successful",
        user,
        token
    })
}

module.exports = {signup, login}