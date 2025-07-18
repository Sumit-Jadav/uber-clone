const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
function connectToDB() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to the database successfully!");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
    });
}

module.exports = connectToDB;
