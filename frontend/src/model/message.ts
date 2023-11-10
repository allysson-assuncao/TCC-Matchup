export const MESSAGE_TYPE = {
    TEXT: 'TEXT',
    AUDIO: 'AUDIO',
    IMAGE: 'IMAGE'
}

export interface Message {
    id?: bigint;
    date: Date;
    senderId: bigint;
    receiverId: bigint;
    messageType: string;
    viewed: boolean;
    hashedImage: string | null;
    hashedAudio: string  | null;
    hashedText: string;

    /*private List<MultipartFile> hashedImage;

    private String hashedAudio;

    private String hashedText;*/
}
