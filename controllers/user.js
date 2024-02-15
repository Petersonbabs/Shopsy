const Users = require("../models/user");

// get all users
const getUsers = async (req, res) => {
    
    const users = await Users.find();

    if (!users) {
        res.status(404).json({
            status: "failed",
            message: 'Unable to fetch users'
        })
    }

    res.status(200).json({ status: "success", message: "All users was successfully fetche!", result: users.length , users})
    return users
}

module.exports = {getUsers}