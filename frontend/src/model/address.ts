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
    number?: undefined;
    street?: undefined;
    city?: undefined;
    neighborhood?: undefined;
    state?: undefined;
    zipcode?: undefined;
};
