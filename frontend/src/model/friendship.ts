import {User} from "./user";

export interface Friendship {
    id: bigint;
    status: string;
    date: Date;
    user: User;
    friend: User;
}

export const FRIENDSHIP_STATUS = {
    SENT: "SENT",
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
    BLOCKED: "BLOCKED",
    ENDED: "ENDED"
}
