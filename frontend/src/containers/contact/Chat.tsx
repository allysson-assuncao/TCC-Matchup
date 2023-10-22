import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from "../../components/contact/Message";
import Grid from "@mui/material/Grid";

const Chat = () => {
    /*const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Substitua 'url' pela URL da API
        axios.get('url')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar mensagens:', error);
            });
    }, []);*/

    const messages = [
        {id: 1, text: 'Mensagem 1'},
        {id: 2, text: 'Mensagem 2'},
        {id: 3, text: 'Mensagem 3'},
        {id: 4, text: 'Mensagem 4'},
        {id: 5, text: 'Mensagem 5'}
    ];

    return (
        <Grid>
            {messages.map((message) => (
                <Message key={message.id} text={message.text} />
            ))}
        </Grid>
    );
};

export default Chat;
