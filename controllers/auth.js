const Users = require("./../models/user");
const bcrypt = require('bcryptjs')
const signJWT = require("./../utils/jwt");
const BlacklistTokens = require("../models/tokenBlacklist");
const yup = require('yup')

// signup
const signup = async (req, res, next) => {
    const { email, password, firstname, lastname } = req.body;
   
    const rules = yup.object().shape({
        email: yup.string().email("É no correct").required(),
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9#@]{8,}$/, 'Please use a very strong password').required()
    })

    try {
        await rules.validate({ email, password, firstname, lastname })
        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            email,
            password: hashedpassword,
            firstname,
            lastname
        })
        if (!newUser) {
            res.status(404).json({
                status: "fail",
                message: "Failed to register new user",
                rules
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
        
    } catch (error) {
        console.log(error)
        next(error)
        // res.send(error)
    }
}

// login
const login = async (req, res, next) => {
    const { email, password } = req.body;
    const rule = yup.object().shape({
        email: yup.string().required().trim(),
        password: yup.string().required()
    })
    try {
        await rule.validate({ email, password })
        const user = await Users.findOne({ email }).select("+password")
        console.log(user);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            const error = new Error("Incorrect email or password");
            error.statusCode = 404;
            next(error)
            
        }

        const token = signJWT(user.id, user.email);
        res.status(200).json({
            status: "success",
            message: "Login successful",
            user,
            token
        })
    } catch (error) {
        console.log(error)
    }
}

// logout
const logout = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.status(404).json({
            status: "fail",
            message: "Please supply token in request body",
        })
    }

    const blacklistedToken = await BlacklistTokens.create({ token })

    if (!blacklistedToken) {
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

module.exports = { signup, login, logout }