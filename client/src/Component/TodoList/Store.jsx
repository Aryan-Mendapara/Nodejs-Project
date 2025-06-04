import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./slice/CartSlice"
import todosReducer from "../../Component/TodoList/Slice/TodoSlice.jsx";

export const Store = configureStore({
    reducer:{
        // cart: cartReducer,
        todos: todosReducer,
    }
})
