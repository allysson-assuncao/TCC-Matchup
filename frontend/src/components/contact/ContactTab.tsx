import React from 'react';
import Grid from "@mui/material/Grid";
import {Tab, Typography} from "@mui/material";

interface ContactProps {
    id: bigint;
    key: string | null | undefined;
    username: string;
    viewed: boolean;
}

const ContactTab: React.FC<ContactProps> = ({ id, key, username, viewed }) => {
    return (
        <Tab label={username} key={key}/>
    );
}
export default ContactTab;
