import axios from "axios";

const RagisterApi = async ({ body }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/v1/ragister/post`,
            body                    
        );
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Ragister Api Error : ", error);
        throw error;
    }
}

export default RagisterApi;