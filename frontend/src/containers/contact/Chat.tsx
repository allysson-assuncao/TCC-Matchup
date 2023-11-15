import React, {useEffect, useState} from 'react';
import MessageComponent from "../../components/contact/MessageComponent";
import Grid from "@mui/material/Grid";
import {Contact} from "../../model/contact";
import {Message, MESSAGE_TYPE} from "../../model/message";
import {getLastMessages, sendMessage} from "../../api/user_requests/messageRequests";
import AppBarChat from "../appbars/AppBarChat";
import ChatFooter from "../footers/ChatFooter";
import {AppBar, TextField, Toolbar, Typography} from "@mui/material";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";

interface ChatProps {
    contact: Contact;
    updateContactsWithMessage: (contactId: bigint, message: Message) => void;
}

const Chat: React.FC<ChatProps> = ({contact, updateContactsWithMessage}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const [messages, setMessages] = useState<Message[]>([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const fetchMoreData = async () => {
        //the last message is the first one or the last one in the list? messages.length - 1
        const lastMessageDate = messages.length > 0 ? messages[0].date : new Date();
        const user1Id = contact.user1Id;
        const user2Id = contact.user2Id;

        const data: Message[] = await getLastMessages(lastMessageDate, user1Id, user2Id);
        if (data.length === 0) {
            setHasMoreItems(false);
        } else {
            setMessages(data);
        }
    };

    const messagesTest = [{id: 1, hashedText: "olá"}, {id: 2, hashedText: "salve"}]

    return (
        <Grid container direction="column" height={'80vh'} sx={{border: '3px solid', borderColor: theme.palette.primary.dark}}>
            <Grid item>
                <AppBarChat contact={contact}/>
            </Grid>
            <Grid item>
                {/*<InfiniteScroll
                dataLength={messages.length}
                next={fetchMoreData}
                hasMore={hasMoreItems}
                loader={<Typography variant={'h4'}>Carregando...</Typography>}
                endMessage={
                    <Typography style={{textAlign: 'center'}}>
                        <b>Você não tem mais mensagens!</b>
                    </Typography>
                }
            >*/}
                <Grid>
                    {contact.messages.map((message) => (
                        <MessageComponent key={message.id.toString()} text={message.hashedText} sender={true}/>
                    ))}

                    {/*{messages.map((message) => (
                        <MessageComponent key={message.id.toString()} text={message.hashedText}/>
                    ))}*/}
                </Grid>
                {/*</InfiniteScroll>*/}
            </Grid>
            <Grid item>
                <ChatFooter contact={contact} updateContactsWithMessage={updateContactsWithMessage}/>
            </Grid>
        </Grid>
    );
};

export default Chat;
