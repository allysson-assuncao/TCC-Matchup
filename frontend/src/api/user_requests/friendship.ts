import axios, {AxiosError, AxiosResponse} from "axios";
import {Friendship} from "../../model/friendship";

const API_BASE_URL = 'http://localhost:8080/api/';

export const sendFriendshipSolicitation = async (senderId: bigint, receiverId: bigint): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.post(`${API_BASE_URL}notification/send-solicitation`,
            {senderId, receiverId});
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

export const areUsersFriends = async (user1Id: bigint, user2Id: bigint): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.get(API_BASE_URL + `${user1Id}/is-friends-with/${user2Id}`);
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

export const friendshipSolicitationResponse = async (friendshipId: bigint, accepted: boolean): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.post(API_BASE_URL + `friendship/solicitation-response/${accepted}`,
            {friendshipId: friendshipId}
        );
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

export const getFriendship = async (user1Id: bigint, user2Id: bigint): Promise<Friendship> => {
    try {
        const response: AxiosResponse<Friendship> = await axios.get(API_BASE_URL + `friendship/get-friendship-by/${user1Id}/and/${user2Id}`);
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

export const endFriendship = async (user1Id: bigint, user2Id: bigint): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.delete(API_BASE_URL + `friendship/end-friendship-between/${user1Id}/and/${user2Id}`);
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

