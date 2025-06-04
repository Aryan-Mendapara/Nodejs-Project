import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTodo,
    removeTodo,
    updateTodo,
    setEdit,
    cancelTodo,
    handleEditChange
} from "../TodoList/Slice/TodoSlice.jsx";
import TodoApi from "../apiServices/TodoApi.jsx";

function ToDo() {
    const [task, setTask] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();
    const { todo, editId, editTask } = useSelector((state) => state.todos);

    // const handleAddTodo = () => {
    //     if (task.trim()) {
    //         dispatch(addToDo(task));
    //         setTask("");
    //     }
    // };

    const handleSaveEdit = () => {
        if (editTask.trim()) {
            dispatch(updateTodo({ id: editId, tasks: editTask }));
            dispatch(cancelTodo()); // Reset edit state after saving
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError();
        setSuccess();

        if (!task.trim()) {
            setError("Please enter a task");
            return;
        }

        try {
            const response = await TodoApi({
                body: { tittle: task },
            });
            dispatch(addTodo(task));            
            setTask("");
            console.log("Server Response", response);

        } catch (error) {
            const message = error.response?.data?.message || "Todo Failed. Try again"
            setError(message);
            console.error(error);
        }
    }

    return (

        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Redux-Toolkit Todo</h1>
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
                {todo.map((todoItem) => (
                    <li key={todoItem.id} className="flex justify-between mt-4 items-center border-b pb-2">
                        {editId === todoItem.id ? (
                            <input
                                type="text"
                                value={editTask}
                                className="border p-2 w-64"
                                onChange={(e) => dispatch(handleEditChange(e.target.value))}
                            />
                        ) : (
                            <span>{todoItem.tasks}</span>
                        )}

                        <div className="flex gap-2">
                            {editId === todoItem.id ? (
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
                                onClick={() => dispatch(removeTodo(todoItem.id))}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
            </ul>
        </div>
    );
}

export default ToDo;