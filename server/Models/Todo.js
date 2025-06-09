const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    }
})

const Todo = mongoose.model("TodoList", TodoSchema);

module.exports = Todo