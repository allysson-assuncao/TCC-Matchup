import {UpdateUserPayload, User} from "../../model/user";
import axios, {AxiosResponse} from "axios";

const API_BASE_URL = 'http://localhost:8080/api/';

export const updateInterestImagesById = async (imageList: File[], interestId: bigint | undefined, token: string) => {
    await axios
        .patch(
            "http://localhost:8080/api/interests/update-images",
            {imageList: imageList, interestId: interestId, token: token},
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
};