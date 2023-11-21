import React, {useEffect, useRef, useState} from 'react';
import {AppBar, Toolbar, Typography, Box, Paper, List, ListItem, ListItemText} from '@mui/material';
import SentMessage from "../../components/contact/SentMessage";
import {getUser} from "../../pages/Home";
import ReceivedMessage from "../../components/contact/ReceivedMessage";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {Contact} from "../../model/contact";
import {Message} from "../../model/message";
import Grid from "@mui/material/Grid";
import AppBarChat from "../appbars/AppBarChat";
import ChatFooter from "../footers/ChatFooter";
import {getLastMessages} from "../../api/user_requests/messageRequests";
/*import socket from "../../api/WebSocketService";*/

interface ChatProps {
    contact: Contact;
    updateContactsWithMessage: (contactId: bigint, message: Message) => void;
}

const Chat: React.FC<ChatProps> = ({contact, updateContactsWithMessage}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const [messages, setMessages] = useState<Array<Message>>(contact.messages);

    const [newTextMessage, setNewTextMessage] = useState<string>('');


    const scrollRef = useRef<HTMLElement>(null);

    const fetchMoreData = async () => {
        const lastMessageDate = messages.length > 0 ? messages[0].date : new Date();
        const user1Id = contact.user1Id;
        const user2Id = contact.user2Id;

        const data: Message[] = await getLastMessages(lastMessageDate, user1Id, user2Id);
        if (data.length !== 0) {
            setMessages(data);
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        const handleScroll = async () => {
            if (scrollElement.scrollTop === 5) {
                await fetchMoreData();
            }
        };

        scrollElement.addEventListener('scroll', handleScroll);

        return () => {
            scrollElement.removeEventListener('scroll', handleScroll);
        };
    }, [messages, fetchMoreData]);



    /*useEffect(() => {
        // Configurar ouvinte para novas mensagens via WebSocket
        socket.on('topic/private/messages', (message: Message) => {
            setMessages([...messages, message]);
        });

        // Cleanup ao desmontar o componente
        return () => {
            socket.off('topic/private/messages');
        };
    }, [messages]);*/


    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;
        scrollElement.scrollTop = scrollElement.scrollHeight;
    }, [messages]);

    return (
        <Grid container direction="column" height={'75vh'}
              sx={{border: '3px solid', borderColor: theme.palette.primary.dark}}>
            <Grid item xs={2}>
                <AppBarChat contact={contact}/>
            </Grid>
            <Grid item xs={8}>
                <Box component="main" sx={{flex: '1 0 auto', overflow: 'auto', maxHeight: '48vh'}} ref={scrollRef}>
                    <Paper sx={{bgcolor: theme.palette.background.default}}>
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={
                                        message.senderId === getUser().id ? <SentMessage text={message.hashedText}/> :
                                            <ReceivedMessage text={message.hashedText}/>
                                    }/>
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={
                                        message.senderId === getUser().id ? <SentMessage text={message.hashedText}/> :
                                            <ReceivedMessage text={message.hashedText}/>
                                    }/>
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={
                                        message.senderId === getUser().id ? <SentMessage text={message.hashedText}/> :
                                            <ReceivedMessage text={message.hashedText}/>
                                    }/>
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={
                                        message.senderId === getUser().id ? <SentMessage text={message.hashedText}/> :
                                            <ReceivedMessage text={message.hashedText}/>
                                    }/>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <ChatFooter contact={contact} updateContactsWithMessage={updateContactsWithMessage}/>
            </Grid>
        </Grid>
    );
};

export default Chat;
