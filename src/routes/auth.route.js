const express = require("express");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const router = express.Router();

/*
POST /register
POST /login
GET /user [protected] */

router.post('/register')

module.exports = router;


/* async(req, res) => {
    const { username, password } = req.body;

    
} */