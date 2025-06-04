const express = require("express")
const index = express.Router();
const User = require("./Login");
const books = require("./Books");
const ragisters = require("./Ragister");
const Todo = require("./Todo");

index.use("/login", User);
index.use("/books",books);
index.use("/ragister",ragisters);
index.use("/todo",Todo)

module.exports = index;