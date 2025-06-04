const Todo = require("../Models/Todo");

const addTodo = async (req, res) => {
    try {
        const { tittle } = req.body;
        console.log("Todo List >>>>> ", req.body);

        if (!tittle || !tittle.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }
        const todo = new Todo({
            tittle
        });
        console.log(">>>>>>>>", todo);

        await todo.save();
        res.status(200).json({ message: "Todo add successfully", todo })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in adding Todo" });
    }
};

const getTodo = async (req, res) => {
    try {
        const todo = await Todo.find();
        res.status(200).json({ message: "Todo  retrieved successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!todo) {
            res.status(400).json({ message: "Todo not Found" });
        }
        res.status(200).json({ message: "Todo updated Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Internal Server Error"})
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            res.status(400).json({ message: "Todo not Found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { addTodo, getTodo, updateTodo, deleteTodo }