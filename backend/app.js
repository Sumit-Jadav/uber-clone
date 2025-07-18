const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const connectToDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);

module.exports = app;
