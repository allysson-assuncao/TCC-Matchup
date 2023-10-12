import axios, {AxiosError, AxiosResponse} from "axios";
import {Notification} from "../../model/notification";

const API_BASE_URL = 'http://localhost:8080/api/notification';

export const getNotificationsByUserId = async (userId: bigint | undefined): Promise<Array<Notification>> => {
    try {
        const response: AxiosResponse<Array<Notification>> = await axios.get(`${API_BASE_URL}/get-by-user-id/${userId}`);

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