const express = require("express")
const index = express.Router();
const User = require("./Login");
const books = require("./Books");
const ragisters = require("./Ragister");

index.use("/login", User);
index.use("/books",books);
index.use("/ragister",ragisters);

module.exports = index;