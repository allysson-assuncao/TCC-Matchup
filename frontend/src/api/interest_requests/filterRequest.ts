import axios, {AxiosError, AxiosResponse} from "axios";

import {Interest} from "../../model/interest";

const API_BASE_URL = 'http://localhost:8080/api/interests/';

export const getFilteredInterests = async (filters: Filters[] | null | undefined): Promise<Interest[]> => {
    try {
        const response: AxiosResponse<Interest[]> = await axios.get(`${API_BASE_URL}/get-all-filtered`,
            {filters});
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
