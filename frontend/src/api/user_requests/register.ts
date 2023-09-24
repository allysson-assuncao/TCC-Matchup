import axios, {AxiosError, AxiosResponse} from 'axios';
import {Interest} from "../../model/interest";
import {User} from "../../model/user";

const API_BASE_URL = 'http://localhost:8080/api/';

export const getAllInterests = async (): Promise<Array<Interest>> => {
    try {
        const response = await axios.get(`${API_BASE_URL}admin/get/interest/all`);
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


export const register = async (user: User): Promise<User> => {
    try {
        let response: AxiosResponse<User, any>;
        response = await axios.post<User>(`${API_BASE_URL}register/user`, user);
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const userAvailability = async (endpoint: string): Promise<ValidationResponse> => {
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

const DATA_VALIDATION_URL = 'http://localhost:8080/api/data-verification';

export interface ValidationResponse {
    status: number;
    body: unknown;
}

export const isUsernameAvailable = async (username: string | undefined): Promise<boolean> => {
    let response: ValidationResponse = await userAvailability(`/username/check-availability/${username}`);
    return (response.status == 200);
};

export const isEmailAvailable = async (email: string | undefined): Promise<boolean> => {
    let response: ValidationResponse = await userAvailability(`/email/check-availability/${email}`);
    return (response.status == 200);
};

export interface AddressFromApi {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia : string,
    ddd: string,
    siafi: string
}

const VIA_CEP_URL = 'https://viacep.com.br/ws/';
export const completeAddressByCep = async (cep: string) => {
    try {
        let response: AxiosResponse<AddressFromApi, any>;
        response = await axios.get<AddressFromApi>(`${VIA_CEP_URL}/${cep}/json`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
