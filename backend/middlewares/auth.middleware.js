const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Token is blacklisted, please login again." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (e) {
    console.log("From authMiddleware:".e);

    return res.status(401).json({ message: "Unauthorized Token" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.spilt(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Token is blacklisted, please login again." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (e) {
    console.log("From authMiddleware:", e);
    return res.status(401).json({ message: "Unauthorized Token" });
  }
};
