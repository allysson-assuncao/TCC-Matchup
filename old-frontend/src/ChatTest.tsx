import React, {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';
import {Button, TextField, Typography} from '@mui/material';

interface Message {
    senderId: number;
    receiverId: number;
    messageType: string;
    viewed: boolean;
    hashedText: string
}

const ChatTest2: React.FC = () => {
    const [client, setClient] = useState<Client | null>(null);
    const [message, setMessage] = useState<Message>(
        {senderId: 0, receiverId: 0, hashedText: '', messageType: "TEXT", viewed: false});
    const [text, setText] = useState<string>("");
    const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                username: 'liceki',
                password: '$2a$10$enNgkfXM.AAHY1mqYW2tn./PIwzyyCnFkwONWqfnGLLRNGZbbz8im',
                simpUser: 'liceki'
            },
            debug: (str) => {
                console.log(str);
            },

            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = (frame) => {
            client.subscribe(`/user/liceki/queue/private-messages`, (message) => {
                console.log(message);
                setReceivedMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
            });
        };

        client.activate();
        setClient(client);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({
            ...message,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (client) {
            client.publish({
                destination: `/app/send-private-message`, body: JSON.stringify({
                    senderId: 2,
                    receiverId: 4,
                    messageType: "TEXT",
                    viewed: false,
                    hashedText: "OLÁ",
                    receiverUsername: "jorge"
                })
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4">LICEKI</Typography>
            <TextField
                name="from"
                label="De"
                value={message.senderId}
                onChange={handleChange}
            />
            <TextField
                name="to"
                label="Para"
                value={message.receiverId}
                onChange={handleChange}
            />
            <TextField
                name="content"
                label="Mensagem"
                value={message.hashedText}
                onChange={handleChange}
            />
            <Button type="submit">Enviar</Button>
            <div>
                {receivedMessages.map((message, index) => (
                    <div key={index}>
                        <p>De: {message.senderId}</p>
                        <p>Mensagem: {message.hashedText}</p>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default ChatTest2;

