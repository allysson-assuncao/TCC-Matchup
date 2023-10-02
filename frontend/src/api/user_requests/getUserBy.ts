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


export const getProfilePictureByUserId = async (userId: BigInt | undefined, width: number, height: number): Promise<string> => {
    try {
        const response: AxiosResponse<Blob> =
            await axios.get(`${API_BASE_URL}profile-picture/by/id/${userId}?width=${width}&height=${height}`, { responseType: 'blob' });
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(`data:image/png;base64,${reader.result.split(',')[1]}`);
                } else {
                    reject('Erro ao converter a imagem para Base64');
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(response.data);
        });
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

