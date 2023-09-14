import axios, {AxiosError, AxiosResponse} from 'axios';
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/login/';

interface LoginResponse {
    /*// Defina a estrutura dos dados de resposta do login
    user: {
        id: BigInt;
        // Outros campos do usuário...
    };*/
}

export const login = async (isEmail: boolean, emailOrUsername: undefined, rawPassword: undefined, remember: undefined): Promise<User> => {
    console.log(rawPassword);
    console.log(remember);
    try {
        let response: AxiosResponse<User, any>;
        const data = isEmail ? { email: emailOrUsername } : { username: emailOrUsername };
        response = await axios.post<User>(`${API_BASE_URL}`, {
            ...data,
            rawPassword,
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

const DATA_VALIDATION_URL = 'http://localhost:8080/api/data-verification';

export interface ValidationResponse {
    status: number;
    body: unknown;
}

export const usernameExists = async (username: string | undefined): Promise<ValidationResponse> => {
    return await userExists(`/username/exists/${username}`);
};

export const emailExists = async (email: string | undefined): Promise<ValidationResponse> => {
    return await userExists(`/email/exists/${email}`);
};


export const userExists = async (endpoint: string): Promise<ValidationResponse> => {
    try {
        const response = await axios.get(`${DATA_VALIDATION_URL}${endpoint}`);
        const validationResponse: ValidationResponse = {
            status: response.status,
            body: response.data,
        };

        console.log(validationResponse);
        return validationResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 409) {
                const validationResponse: ValidationResponse = {
                    status: 409,
                    body: axiosError.response.data, // Use o corpo da resposta de erro 409
                };
                return validationResponse;
            } else {
                console.error('Network or Server Error:', axiosError.message);
                throw axiosError;
            }
        } else {
            console.error('Erro não relacionado ao Axios:', error);
            throw error;
        }
    }
};
