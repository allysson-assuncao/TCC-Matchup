import React from "react";
import {Typography} from "@mui/material";

interface MessageProps {
    text: string;
}

const MessageComponent: React.FC<MessageProps> = ({ text }) => {

    return(
        <Typography>{text}</Typography>
    );

}

export default MessageComponent;
