import {User} from "./user";

export interface Friendship {
    id: bigint;
    status: string;
    date: Date;
    user: User;
    friend: User;
}
