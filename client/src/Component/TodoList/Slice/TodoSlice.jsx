import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todo: [],
    editId: null,
    editTask: '',
};

const ToDoReducer = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo.push({ id: nanoid(), tasks: action.payload });
            console.log(">>>>>>>>>",action);
            
        },
        removeTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            state.todo = state.todo.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { id: todo.id, tasks: action.payload.tasks };
                }
                return todo;
            });
        },
        setEdit: (state, action) => {
            state.editId = action.payload.id
            state.editTask = action.payload.tasks
        },
        cancelTodo: (state, action) => {
            state.editId = null
            state.editTask = ''
        },
        handleEditChange: (state, action) => {
            state.editTask = action.payload;

        }
    },
});

export const { addTodo, removeTodo, updateTodo, setEdit, cancelTodo, handleEditChange} = ToDoReducer.actions;
export default ToDoReducer.reducer;