export interface Notification {
    id: bigint;
    senderId: bigint;
    senderUsername: string;
    receiverId: bigint;
    friendshipId: bigint;
    viewed: boolean;
    type: string;
    date: Date;
    content: string;

}