import axios, {AxiosError, AxiosResponse} from "axios";
import {Message} from "../../model/message";

const API_BASE_URL = 'http://localhost:8080/api/message/';

export const sendMessage = async (newMessage: Message): Promise<Message> => {
    try {
        const response: AxiosResponse<Message> = await axios.post(`${API_BASE_URL}send-message`, {
            newMessage
        });
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

export const getLastMessages = async (lastMessageDate: Date, user1Id: bigint, user2Id: bigint): Promise<Message[]> => {
    try {
        const response: AxiosResponse<Message[]> = await axios.get(`${API_BASE_URL}get-by-last-message-${lastMessageDate}-and-users-id-${user1Id}-${user2Id}`);
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
