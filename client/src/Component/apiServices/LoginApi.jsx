import axios from 'axios';

const LoginUser = async ({ body }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/v1/login/user`,
            body
        );
        console.log(response);

        return response.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export default LoginUser;