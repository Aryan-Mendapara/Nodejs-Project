const mongoose = require("mongoose");
const { type } = require("os");

const TodoSchema = new mongoose.Schema({
    tittle: {
        type: String,
        description: String,
        completed: Boolean
    }    
})

const Todo = mongoose.model("TodoList", TodoSchema);

module.exports = Todo