const userModel = require("../models/user.model");

module.exports.createUser = async (registerUserdata) => {
  const { firstName, lastName, email, password } = registerUserdata;
  if (!firstName || !email || !password) {
    throw new Error("All fileds are required!");
  }
  const user = userModel.create({
    fullName: { firstName, lastName },
    email,
    password,
    socketId: null,
  });

  return user;
};
