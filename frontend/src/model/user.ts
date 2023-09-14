import {Address} from "./address";
import {Friendship} from "./friendship";
import {Interest} from "./interest";
import {Message} from "./message";

export enum DefaultPrivacyLevel {
    public = "public",
    private = "private",
    contacts = "contacts",
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
}

export type SignInPayload = {
    password?: undefined;
    emailOrUsername?: undefined;
    remember?: undefined;
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

export type SignUpPayload = Pick<User, "username" | "hashedPassword" | "name">;
