const express = require("express");
const { addTodo, deleteTodo, getTodo, updateTodo } = require("../Controller/Todo");
const Todo = express.Router();

Todo.post("/post",addTodo);
Todo.get("/get",getTodo);
Todo.patch("/update/:id",updateTodo);
Todo.delete("/delete/:id",deleteTodo);

module.exports = Todo