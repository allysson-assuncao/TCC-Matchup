import React from 'react';
import { Box } from '@mui/material';
import Message from "./Message";

interface ChatMessage {
    senderId: string;
    text: string;
}

interface ChatProps {
    currentUserId: string;
    contactId: string;
}

interface Chats {
    [key: string]: ChatMessage[];
}

const chats: Chats = {
    '1': [
        {
            senderId: '1',
            text: 'Olá, como você está?',
        },
        {
            senderId: '2',
            text: 'Estou bem, obrigado! E você?',
        },
    ],
    '2': [
        {
            senderId: '1',
            text: 'Oi, tudo bem?',
        },
        {
            senderId: '2',
            text: 'Tudo ótimo! Como vai você?',
        },
    ],
};

const Chat = ({ currentUserId, contactId }: ChatProps) => {
    // Aqui você pode buscar as mensagens específicas do contato usando o contactId
    const messages: ChatMessage[] = chats[contactId] || [];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                height: '100%',
                overflowY: 'auto',
            }}
        >
            {messages.map((message, index) => (
                <Message key={index} senderId={message.senderId} currentUserId={currentUserId} text={message.text} />
            ))}
        </Box>
    );
};

export default Chat;
