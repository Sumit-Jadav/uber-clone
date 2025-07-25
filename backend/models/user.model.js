const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long!"],
    },
    lastName: {
      type: String,
      default: null,
      validate: {
        validator: function (value) {
          // Only validate if not null or empty string
          return !value || value.length >= 3;
        },
        message: "Last name must be at least 3 characters long!",
      },
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: [5, "Email must be at least 5 characters long!"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
    default: null,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
