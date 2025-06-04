import axios from "axios";

export const TodoApi = async ({body}) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/v1/todo/post`,
            body
        )
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Todo Api error:", error);
        throw error;
    }
}


export const ToDoEdit = async ({body, id}) => {
    try {
        const response = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/v1/todo/update/${id}`,
            body
        )
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Todo Api error:", error);
        throw error;
    }
}

