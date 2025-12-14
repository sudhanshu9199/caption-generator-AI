const express = require("express");
const userModel = require("../models/user.model.js");
const { registerController, loginController, verifyUserController, logoutController } = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

/*
POST /register
POST /login
GET /user [protected] */

router.post('/register', registerController);

router.post('/login', loginController);
router.get('/verify', authMiddleware, verifyUserController);
router.post('/logout', logoutController);

module.exports = router;