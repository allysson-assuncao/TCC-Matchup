import axios, {AxiosError, AxiosResponse} from "axios";
import {Contact} from "../../model/contact";

const API_BASE_URL = 'http://localhost:8080/api/contact/';
export const getContactsByUserId = async (userId: bigint): Promise<Contact[]> => {
    try {
        const response: AxiosResponse<Contact[]> = await axios.get(API_BASE_URL + `get-by-user1-id/${userId}`);
        console.log("Contacts:");
        console.log(response.data);
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
