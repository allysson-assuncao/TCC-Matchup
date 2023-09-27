import axios, {AxiosError, AxiosResponse} from 'axios';
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/forgot-password/';

interface updatePasswordProps {
    id: BigInt
    rawPassword: string
}

export const confirmEmail = async (email: string) => {
    try {
        let response: AxiosResponse<BigInt, any>;
        response = await axios.post<BigInt>(`${API_BASE_URL}confirm-email`, email);
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const verifyCode = async (code: string, id: BigInt): Promise<Boolean> => {
    try {
        let response: AxiosResponse<Boolean, any>;
        response = await axios.post<Boolean>(`${API_BASE_URL}verify_code`, {
            code,
            id
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const updatePassword = async (id: BigInt, rawPassword: string)  => {
    try {
        let response: AxiosResponse<Boolean, any>;
        response = await axios.post<Boolean>(`${API_BASE_URL}reset_password`, {
            id,
            rawPassword
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};
