const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // schema level vaidation
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model('userAuth', userSchema)

module.exports = userModel;