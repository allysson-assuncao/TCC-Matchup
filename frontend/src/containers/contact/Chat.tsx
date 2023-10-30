import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from "../../components/contact/Message";
import Grid from "@mui/material/Grid";
import {Contact} from "../../model/contact";

interface ChatProps {
    contact: Contact
}

const Chat: React.FC<ChatProps> = ({ contact }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const fetchMoreData = () => {
        fetch('/api/messages?limit=50')
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    setHasMoreItems(false);
                } else {
                    setMessages(messages.concat(data));
                }
            });
    };

    const sendMessage = () => {
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: newMessage }),
        })
            .then(response => response.json())
            .then(message => {
                setMessages([message, ...messages]);
                setNewMessage('');
            });
    };

    useEffect(() => {
        fetchMoreData();
    }, []);

    return (

        <Grid>
            {contact.messages.map((message) => (
                <Message key={message.id.toString()} text={message.hashedText}/>
            ))}
        </Grid>
    );
};

export default Chat;
