const express = require("express");
const userModel = require("../models/user.model.js");
const { registerController, loginController } = require("../controllers/auth.controller.js");
const router = express.Router();

/*
POST /register
POST /login
GET /user [protected] */

router.post('/register', registerController);

router.post('/login', loginController);

module.exports = router;


/* async(req, res) => {
    const { username, password } = req.body;

    
} */