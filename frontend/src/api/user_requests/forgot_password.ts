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
