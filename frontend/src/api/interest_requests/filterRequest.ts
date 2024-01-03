import axios, {AxiosError, AxiosResponse} from "axios";

import {Interest} from "../../model/interest";
import {InterestRequest} from "../../model/interest_filtered_request";
import {Filter} from "../../model/filters";

const API_BASE_URL = 'http://localhost:8080/api/interests/';

export const getFilteredInterests = async (
    filters: Filter[] | null | undefined,
    token: any,
    page = 0,
    orderBy = "",
    direction = "",
    size = 200,
): Promise<InterestRequest> => {
    try {
        const response: AxiosResponse<InterestRequest> = await axios.post(
            `${API_BASE_URL}get-by-specifications?orderBy=${orderBy}&direction=${direction}&size=${size}&page=${page}`,
            {"searchRequestDtos": filters},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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
