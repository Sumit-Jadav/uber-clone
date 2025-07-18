const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("FirstName must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long!"),
  ],
  userController.registerUser
);

module.exports = userRouter;
