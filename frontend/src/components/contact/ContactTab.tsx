import React from 'react';
import Grid from "@mui/material/Grid";
import {Tab, Typography} from "@mui/material";

interface ContactProps {
    id: bigint;
    name: string;
    viewed: boolean;
}

const ContactTab: React.FC<ContactProps> = ({ id, name, viewed }) => {
    return (
        <Tab label={name} key={id.toString()}/>
    );
}
export default ContactTab;
