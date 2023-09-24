import React from 'react';
import {
    Avatar,
    Typography,
    TextField,
    Grid, Fab, List, ListItemIcon, ListItem, Paper, ListItemText, Divider, makeStyles, Tab,
} from '@mui/material';
import {styled} from "@mui/material/styles";

const StyledTab = styled(Tab)({
    flexDirection: 'row',
    maxWidth: 'content',
});

interface ProfileTabProps {
    label: string;
    iconUrl: string;
}

const ContactTab = ({ label, iconUrl, ...other }: ProfileTabProps) => (
    <StyledTab icon={<Avatar alt={label} src={iconUrl} />} label={label} {...other} />
);

export default ContactTab;
