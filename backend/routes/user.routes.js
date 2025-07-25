const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("FirstName must be at least 3 characters long"),
    body("fullName.lastName")
      .optional({ checkFalsy: true })
      .isLength({ min: 3 })
      .withMessage("lastName must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long!"),
  ],
  userController.registerUser
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long!"),
  ],
  userController.loginUser
);

userRouter.get(
  "/profile",
  authMiddleware.authUser,
  userController.getUserProfile
);

userRouter.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = userRouter;
