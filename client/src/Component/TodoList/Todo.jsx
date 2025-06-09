import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import {
    addTodo,
    removeTodo,
    updateTodo,
    setEdit,
    cancelTodo,
    handleEditChange
} from "../TodoList/Slice/TodoSlice.jsx";

import { TodoAdd, ToDoDelete, ToDoEdit } from "../apiServices/TodoApi.jsx";

function ToDo() {
    const [task, setTask] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();
    const { todo, editId, editTask } = useSelector((state) => state.todos);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!task.trim()) {
            setError("Please enter a task");
            return;
        }

        try {
            const response = await TodoAdd({ 
                body: { tittle: task }, 
            });
            dispatch(addTodo(response.todo)); // ✅ use backend response directly
            setTask("");
            setSuccess("Todo added successfully");
            console.log(">>>>>>>>>",response);
            
        } catch (error) {
            const message = error.response?.data?.message || "Todo Failed. Try again";
            setError(message);
        }
    };

    const handleDelete = async (id) => {
        setError("");
        setSuccess("");

        try {
            const response = await ToDoDelete({ id });
            dispatch(removeTodo(id));
            setSuccess("Todo deleted successfully");
        } catch (error) {
            const message = error.response?.data?.message || "Todo delete failed.";
            setError(message);
        }
    };

    const handleSaveEdit = async () => {
        setError("");
        setSuccess("");

        if (!editTask.trim()) {
            setError("Please enter a task to update");
            return;
        }

        try {
            console.log("Sending editId to ToDoEdit:", editId);
            const response = await ToDoEdit({
                id: editId,
                body: { tittle: editTask }               
            });

            dispatch(updateTodo(response)); // ✅ use backend response
            dispatch(cancelTodo());
            setSuccess("Todo updated successfully");
            console.log("editId:", editId);
            
        } catch (error) {
            const message = error.response?.data?.message || "Update failed.";
            setError(message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todo</h1>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter Todo"
                    value={task}
                    className="border p-2 w-64"
                    onChange={(e) => setTask(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                    Add Todo
                </button>
            </div>

            <ul className="mt-4">
                {todo.map((todoItem, index) => (
                    <li key={todoItem._id || index} className="flex justify-between mt-4 items-center border-b pb-2">
                        {editId === todoItem._id ? (
                            <input
                                type="text"
                                value={editTask || ""}
                                className="border p-2 w-64"
                                onChange={(e) => dispatch(handleEditChange(e.target.value))}
                            />
                        ) : (
                            <span>{todoItem.tittle}</span>
                        )}

                        <div className="flex gap-2">
                            {editId === todoItem._id ? (
                                <>
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-3 py-1 rounded"
                                        onClick={() => dispatch(cancelTodo())}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    onClick={() => dispatch(setEdit(todoItem))}
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => handleDelete(todoItem._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    );
}

export default ToDo;
