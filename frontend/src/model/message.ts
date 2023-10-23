export const MESSAGE_TYPE = {
    TEXT: 'TEXT',
    AUDIO: 'AUDIO',
    IMAGE: 'IMAGE'
}

export interface Message {
    id: bigint;
    date: Date;
    senderId: bigint;
    receiverId: bigint;
    viewed: boolean;
    messageType: string;
    hashedImage: string;
    hashedAudio: string;
    hashedText: string;

    /*private List<MultipartFile> hashedImage;

    private String hashedAudio;

    private String hashedText;*/
}
