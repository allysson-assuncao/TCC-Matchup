import React from "react";
import {Typography} from "@mui/material";

interface MessageProps {
    text: string;
    sender: boolean;
}

const MessageComponent: React.FC<MessageProps> = ({ text, sender }) => {

    return(
        <Typography justifyContent={sender? "right" : "left"}>{text}</Typography>
    );

}

export default MessageComponent;
