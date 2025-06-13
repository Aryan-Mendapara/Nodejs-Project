const express = require("express")
const index = express.Router();
const User = require("./Login");
const books = require("./Books");
const ragisters = require("./Ragister");
const Todo = require("./Todo");
const router = require("./admin");

index.use("/v2", User);
index.use("/books",books);
index.use("/ragister",ragisters);
index.use("/todo",Todo)
// index.use("/login", router)

module.exports = index;