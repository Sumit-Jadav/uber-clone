const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "first name must be at least 3 characters long"],
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
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
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
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "plate number must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
    },
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("Captain", captainSchema);
module.exports = captainModel;
