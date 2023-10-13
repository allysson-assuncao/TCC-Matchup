import {Notification} from "../../model/notification";
import axios, {AxiosError, AxiosResponse} from "axios";

const API_BASE_URL = 'http://localhost:8080/api/';

export const isBlockedBy = async (blockedId: bigint, blockerId: bigint): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.get(API_BASE_URL + `${blockedId}/is-blocked-by/${blockerId}`);
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

export const block = async (blockedId: bigint, blockerId: bigint): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.post(API_BASE_URL + 'block',
            {blockedId, blockerId});
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

export const unblock = async (blockedId: bigint, blockerId: bigint): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await axios.post(API_BASE_URL + `unblock`,
            {blockedId, blockerId});
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