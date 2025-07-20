const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const blacklistTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");
module.exports.registerUser = async function (req, res, next) {
  //! to get errors from express-validator which are provided in route section
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  console.log(req.body);
  const { fullName, email, password } = req.body;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res
      .status(400)
      .json({ message: "User already exists with this email!" });
  }
  const hashPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();
  return res.status(200).json({
    token,
    user,
  });
};

module.exports.loginUser = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  //* Note:- select('+password') means we are including password in response by default we have select as false in model.
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });
  return res.status(200).json({ token, user });
};

module.exports.getUserProfile = async function (req, res, next) {
  return res.status(200).json({ user: req.user });
};

module.exports.logoutUser = async function (req, res, next) {
  res.clearCookie("token"); //? does not delete cookie immediately it remove cookie from the response and at processing time cookie is still present
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  return res.status(200).json({ message: "Logged out successfully" });
};
