import axios, {AxiosError, AxiosResponse} from "axios";

const API_BASE_URL = 'http://localhost:8080/api/get/user/';

export const getProfileByUsernameAndUserId = async (username: string, userId: bigint): Promise<{}> => {
    try {
        const response: AxiosResponse<{}> =
            await axios.get(`${API_BASE_URL}profile/${username}/accessed-by/${userId}`);
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
