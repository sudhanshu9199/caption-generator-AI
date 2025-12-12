// auth.middleware.js
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware (req, res, next) {
    console.log('Auth middleware — cookies:', req.cookies, 'headers.Authorization:', req.headers.authorization);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthenticated, please login first.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token, please login first.",
    });
  }
}

module.exports = authMiddleware;