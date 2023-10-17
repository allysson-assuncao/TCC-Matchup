/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from "../../components/Contact/Message";

const ChatContainer = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Substitua 'url' pela URL da API
        axios.get('url')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar mensagens:', error);
            });
    }, []);

    return (
        <div>
            {messages.map((message) => (
                <Message key={message.id} text={message.text} />
            ))}
        </div>
    );
};

export default ChatContainer;
*/
