import axios, {AxiosError, AxiosResponse} from "axios";

const API_BASE_URL = 'http://localhost:8080/api/interests/';

export const linkInterestToUser = async (userId: bigint, interestId: bigint): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.post(API_BASE_URL + 'link-to-user',
            {userId, interestId});
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
