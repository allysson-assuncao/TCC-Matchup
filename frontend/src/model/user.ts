import {Address} from "./address";
import {Friendship} from "./friendship";
import {Interest} from "./interest";
import {Message} from "./message";

/*export enum DefaultPrivacyLevel {
    public = "public",
    private = "private",
    contacts = "contacts",
}*/

export const USER_TYPE = {
    DEFAULT: 'DEFAULT',
    INTERMEDIATE: 'INTERMEDIATE',
    PREMIUM: 'PREMIUM',
    DEVELOPER: 'DEVELOPER',
    ADMIN: 'ADMIN'
}

export interface User {
    id: bigint;
    name: string;
    username: string;
    email: string;
    birthDate: Date;
    hashedPassword: string;
    cellphoneNumber: string;
    profilePicture: string;
    bio: string;
    address: Address;
    friends: Friendship;
    interests: Interest;
    sentMessages: Array<Message>;
    receivedMessages: Array<Message>;
    type: string;
}

export type SignInPayload = {
    emailOrUsername: string;
    password: string;
    remember: boolean;
};

export type SignUpStep1Payload = {
    name?: undefined;
    username?: undefined;
    email?: undefined;
    password?: undefined;
    confirmedPassword?: undefined;
    date?: undefined;
};

export type SignUpStep3Payload = {
    interests?: undefined;
};

export type SignUpStep4Payload = {
    cellphoneNumber?: undefined;
    bio?: undefined;
};

export type UpdateUserPayload = {
    id: bigint;
    username?: undefined | string;
    cellphoneNumber?: undefined | string;
    bio?: undefined | string;
    profilePicture?: undefined | File;
};

export type FriendPayload = {
    id: bigint;
    username: string;
};

export type SignUpPayload = Pick<User, "username" | "hashedPassword" | "name">;
