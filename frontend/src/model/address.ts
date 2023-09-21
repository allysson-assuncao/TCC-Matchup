import {User} from "./user";

export interface Address {
    id: bigint;
    number: bigint;
    street: string;
    city: string;
    neighborhood: string;
    state: string;
    zipcode: string;
    user: User;
}

export type SignUpStep2Payload = {
    number?: undefined | string;
    street?: undefined | string;
    city?: undefined | string;
    neighborhood?: undefined | string;
    state?: undefined | string;
    zipcode?: undefined | string;
};
