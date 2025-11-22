const userModel = require('../models/user.model');

async function registerController(req, res) {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({
        username
    })

    if (existingUser) {
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const user = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message: "user created successfully!",
        user
    })
}

async function loginController(req, res) {
    const { username, password } = req.body;
}

module.exports = {
    registerController,
}