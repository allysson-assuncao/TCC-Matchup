import axios, {AxiosError, AxiosResponse} from 'axios';
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/';

export const updatePassword = async ({user}: { user: any }): Promise<User> => {
    try {
        let response: AxiosResponse<User, any>;
        response = await axios.post<User>(`${API_BASE_URL}reset_password`, {
            ...user
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const confirmEmail = async ({email}: { email: string }): Promise<Boolean> => {
    try {
        let response: AxiosResponse<Boolean, any>;
        response = await axios.post<Boolean>(`${API_BASE_URL}login/forgot-password/${email}`, {
            email
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const verifyCode = async ({code, id}: { code: string , id: any}): Promise<String> => {
    try {
        let response: AxiosResponse<String, any>;
        response = await axios.post<String>(`${API_BASE_URL}data-verification/verify-code/${id}/${id}`, {
            code,
            id
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};
