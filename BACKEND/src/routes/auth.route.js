const express = require("express");
const userModel = require("../models/user.model.js");
const { registerController, loginController, verifyUserController, logoutController } = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);
router.get('/verify', verifyUserController);
router.post('/logout', logoutController);

module.exports = router;