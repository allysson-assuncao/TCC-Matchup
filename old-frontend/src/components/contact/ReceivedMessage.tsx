import React from "react";
import {Typography} from "@mui/material";

interface ReceivedMessageProps {
    text: string;
}

const ReceivedMessage: React.FC<ReceivedMessageProps> = ({ text }) => {

    return(
        <Typography justifyContent={"end"}>{text}</Typography>
    );

}

export default ReceivedMessage;
