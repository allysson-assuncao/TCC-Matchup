import axios, {AxiosError, AxiosResponse} from 'axios';
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/';

export const updatePassword = async ({id, rawPassword}: { id: any , rawPassword: string}): Promise<User> => {
    try {
        let response: AxiosResponse<User, any>;
        response = await axios.post<User>(`${API_BASE_URL}reset_password`, {
            id,
            rawPassword
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const confirmEmail = async ({email}: { email: string }): Promise<Boolean> => {
    try {
        let response: AxiosResponse<Boolean, any>;
        response = await axios.post<Boolean>(`${API_BASE_URL}confirm_email`, {
            email
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const verifyCode = async ({code, user}: { code: string , user: any}): Promise<String> => {
    try {
        let response: AxiosResponse<String, any>;
        response = await axios.post<String>(`${API_BASE_URL}verify_code`, {
            code,
            ...user
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};
