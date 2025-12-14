const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({
    username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10), // what is 10 here? -> salt rounds? -> higher the rounds, more secure but slower
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully!",
    user,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    message: "login successful",
    user: {
      username: user.username,
      id: user._id,
    },
  });
}

async function verifyUserController(req, res) {
  return res.status(200).json({
    message: 'User is authenticated',
    user: req.user,
  });
}

async function logoutController(req, res) {
  res.clearCookie('token');
  return res.status(200).json({
    message: 'Logged out successfully'
  });
}

module.exports = {
  registerController,
  loginController,
  verifyUserController,
  logoutController
};
