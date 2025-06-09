import axios from "axios";

export const TodoAdd = async ({ body }) => {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/todo/post`,
        body
    );
    return response.data;
};

export const ToDoEdit = async ({ body, id }) => {
    const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/v1/todo/update/${id}`,
        body
    );
    return response.data;
};

export const ToDoDelete = async ({ id }) => {
    const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/v1/todo/delete/${id}`
    );
    return response.data;
};
