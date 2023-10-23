import {Message} from "./message";

export interface Contact {
    id: bigint;
    user1Id: bigint;
    user2Id: bigint;
    user2Username: string;
    viewed: boolean;
    messages: Message[];
}
