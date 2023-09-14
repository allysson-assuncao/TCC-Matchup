import {User} from "./user";

export enum DefaultPrivacyLevel {
    public = "public",
    private = "private",
    contacts = "contacts",
}

export interface Message {
    id: bigint;
    hashedContent: string;
    date: Date;
    extension: string;
    sender: User;
    receiver: User;
    status: string;
}
