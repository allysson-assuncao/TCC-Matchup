import axios, {AxiosError, AxiosResponse} from "axios";
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/get/user/by/';

export const getUserByUsername = async (username: string | undefined): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axios.get(`${API_BASE_URL}username/${username}`);

        console.log(response);
        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 409) {
                console.error('Network or Server Error:', axiosError.message);
            }
            throw error;
        } else {
            console.error('Erro não relacionado ao Axios:', error);
            throw error;
        }
    }
};
