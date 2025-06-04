const express = require("express");
const { addBooks, getBooks, getBooksId, updateBooks, deleteBooks } = require("../Controller/Books");
const  books = express.Router();

books.post("/Post",addBooks);
books.get("/getById/:id",getBooksId);
books.get("/get",getBooks);
books.patch("/update/:id",updateBooks);
books.delete("/delete/:id",deleteBooks);

module.exports = books;