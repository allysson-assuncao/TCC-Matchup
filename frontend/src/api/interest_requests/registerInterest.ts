import axios from 'axios';

interface JsonObject {
    [key: string]: any;
}

const API_BASE_URL = 'http://localhost:8080/api/admin/register/';

export const registerAll = async (type: string, jsonObject: JsonObject) => {
    try {
        const response = await axios.post(API_BASE_URL + type, jsonObject, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`Error sending data: ${response.statusText}`);
        }

        addOptionToDropDown(type, response.data);
    } catch (error) {
        alert(`An error occurred in register(): ${error}`);
    }
}

export const registerInterestDependency = async (type: string, name: string):  => {
    const jsonObject: JsonObject = {};

    if (!name || !type) return;

    jsonObject['name'] = name;
    registerAll(type, jsonObject);
    return jsonObject;
}

export const getAll = async (type: string): Promise<boolean> => {
    try {
        const response = axios.get(`${API_BASE_URL}${type}/all`);
        return response.data;
    } catch (error) {
        throw new Error(`Error getting ${type}s: ${error}`);
    }
};

function addOptionToDropDown(type: string, data: any) {
    // Implement this function based on your specific requirements
    // This function should handle the logic for adding options to the dropdown
    console.log(`Option added to dropdown for ${type}:`, data);
}
