import { createSlice } from "@reduxjs/toolkit";

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
            state.todo.push({
                _id: action.payload._id,
                tittle: action.payload.tittle,
            });
        },

        removeTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo._id !== action.payload);
        },

        updateTodo: (state, action) => {
            state.todo = state.todo.map((todo) => {
                if (todo._id === action.payload._id) {
                    return { ...todo, tittle: action.payload.tittle };
                }
                return todo;
            });
        },

        setEdit: (state, action) => {
            state.editId = action.payload._id;
            state.editTask = action.payload.tittle;
        },

        cancelTodo: (state) => {
            state.editId = null;
            state.editTask = '';
        },

        handleEditChange: (state, action) => {
            state.editTask = action.payload;
        },
    },
});

export const {
    addTodo,
    removeTodo,
    updateTodo,
    setEdit,
    cancelTodo,
    handleEditChange,
} = ToDoReducer.actions;

export default ToDoReducer.reducer;
