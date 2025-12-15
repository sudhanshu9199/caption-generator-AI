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
      {id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: '2d'}
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? 'None' : 'lax',
    maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
  });

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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'None' : 'lax',
    maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
  });

  res.status(200).json({
    message: "login successful",
    user: {
      username: user.username,
      id: user._id,
    },
  });
}

async function verifyUserController(req, res) {
  try {
    const token = req.cookies.token;

    // If no token, return null user but status 200 (No error)
    if (!token) {
      return res.status(200).json({ user: null });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(200).json({ user: null });
    }

    // If valid, return user
    return res.status(200).json({
      message: "User is authenticated",
      user,
    });
  } catch (err) {
    return res.status(200).json({ user: null });
  }
}

async function logoutController(req, res) {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logged out successfully",
  });
}

module.exports = {
  registerController,
  loginController,
  verifyUserController,
  logoutController,
};
