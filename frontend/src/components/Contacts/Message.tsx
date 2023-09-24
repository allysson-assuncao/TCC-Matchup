import React, {useContext, useEffect, useRef} from 'react';
import {
    Box
} from '@mui/material';
import {styled} from "@mui/material/styles";

const MessageContainer = styled(Box)(({ theme }) => ({
    maxWidth: '80%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(2),
}));

interface MessageProps {
    senderId: string;
    currentUserId: string;
    text: string;
}

const Message = ({ senderId, currentUserId, text }: MessageProps) => {
    const isCurrentUser = senderId === currentUserId;

    return (
        <MessageContainer
            sx={{
                alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                bgcolor: isCurrentUser ? 'primary.main' : 'secondary.main',
                color: 'white',
            }}
        >
            {text}
        </MessageContainer>
    );
};

export default Message;
