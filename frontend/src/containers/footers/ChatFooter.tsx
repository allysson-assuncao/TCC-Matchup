import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import {AppBar, Button, TextField, Toolbar} from "@mui/material";
import {Message, MESSAGE_TYPE} from "../../model/message";
import {sendMessage} from "../../api/user_requests/messageRequests";
import {useState} from "react";
import {Contact} from "../../model/contact";
import * as React from "react";

interface ChatFooterProps {
    contact: Contact;
    updateContactsWithMessage: (contactId: bigint, message: Message) => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({contact, updateContactsWithMessage}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const message: Message = {
                date: new Date(),
                senderId: contact.user1Id,
                receiverId: contact.user2Id,
                viewed: false,
                messageType: MESSAGE_TYPE.TEXT,
                hashedImage: '',
                hashedAudio: '',
                hashedText: newMessage
            };

            updateContactsWithMessage(contact.user1Id, (await sendMessage(message)));
            setNewMessage('');
        }
    };

    return (
        <Box bgcolor={theme.palette.background.default}>
            <CssBaseline/>
            <Grid
                container
                direction="row"
            >
                <Grid item xs={12} md={12}>
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: '0px',
                            marginTop: '0px',
                            transition: 'border-radius 0.3s ease, margin-top 0.3s ease',
                            bgcolor: 'background.default',
                            top: 'auto',
                            bottom: 0,
                        }}
                    >
                        <Toolbar>
                            <Grid container spacing={0} alignContent='center'>
                                <Grid container spacing={0} alignItems="center">
                                    <Grid item justifyContent={'start'}>
                                        <TextField
                                            value={newMessage}
                                            onChange={event => setNewMessage(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item justifyContent={'end'}>
                                        <Button onClick={handleSendMessage}>Enviar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ChatFooter;
