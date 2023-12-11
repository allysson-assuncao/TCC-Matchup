import {Message} from "./message";

export interface Contact {
    id: bigint;
    user1Id: bigint;
    user2Id: bigint;
    user2Username: string;
    displayed: boolean;
    messages: Message[];
}
