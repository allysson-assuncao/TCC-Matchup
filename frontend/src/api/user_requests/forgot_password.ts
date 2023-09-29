import axios, {AxiosError, AxiosResponse} from 'axios';
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/forgot-password/';

interface updatePasswordProps {
    id: bigint
    rawPassword: string
}

export const confirmEmail = async (email: string) => {
    try {
        let response: AxiosResponse<number, any>;
        response = await axios.post<number>(`${API_BASE_URL}confirm-email?email=${email}`);
        return BigInt(response.data);
    } catch (error) {
        throw error;
    }
};

export const verifyCode = async (code: string, id: bigint): Promise<Boolean> => {
    try {
        let response: AxiosResponse<Boolean, any>;
        response = await axios.post<Boolean>(`${API_BASE_URL}verify-code/${code}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async (idBigInt: bigint, rawPassword: string)  => {
    try {
        let id = Number(id);
        let response: AxiosResponse<boolean, any>;
        response = await axios.put<boolean>(`${API_BASE_URL}reset-password`, {
            id,
            rawPassword
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

