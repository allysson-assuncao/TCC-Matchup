import {User} from "./user";

export interface Friendship {
    id: bigint;
    status: string;
    date: Date;
    user: User;
    friend: User;
}

export const FRIENDSHIP_STATUS = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REFUSED: "REFUSED",
    BLOCKED: "BLOCKED",
    ENDED: "ENDED"
}
