import axios, {AxiosError, AxiosResponse} from "axios";
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/get/user/';

export const getUserByUsername = async (username: string | undefined): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axios.get(`${API_BASE_URL}by/username/${username}`);

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


export const getProfilePictureByUserId = async (userId: BigInt | undefined): Promise<string> => {
    try {
        const response: AxiosResponse<ArrayBuffer> = await axios.get(`${API_BASE_URL}profile-picture/by/id/${userId}`);
        let img = '';
        /*const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                img = reader.result;
            }
        };*/
        const avatarData = new Uint8Array(response.data);
        const binaryString = avatarData.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        );

        console.log(response);
        return btoa(binaryString);

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
