import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from "../../components/contact/Message";
import Grid from "@mui/material/Grid";
import {Contact} from "../../model/contact";

interface ChatProps {
    contact: Contact
}

const Chat: React.FC<ChatProps> = ({ contact }) => {
    return (
        <Grid>
            {contact.messages.map((message) => (
                <Message key={message.id.toString()} text={message.hashedText}/>
            ))}
        </Grid>
    );
};

export default Chat;
