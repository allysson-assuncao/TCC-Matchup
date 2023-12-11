import React from "react";
import {Typography} from "@mui/material";

interface SentMessageProps {
    text: string;
}

const SentMessage: React.FC<SentMessageProps> = ({ text }) => {

    return(
        <Typography justifyContent={"start"}>{text}</Typography>
    );

}

export default SentMessage;
