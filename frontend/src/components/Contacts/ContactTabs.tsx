import React from 'react';
import {
    Box,
} from '@mui/material';
import ContactTab from "./ContactTab";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import Chat from "./Chat";
import {useNavigate} from "react-router-dom";

interface Contact {
    id: string;
    name: string;
    imageUrl: string;
}

interface ContactListProps {
    contacts: Contact[];
}

export const ContactTabs = ({ contacts }: ContactListProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <Box sx={{typography: 'body1', display: 'flex'}}>
            <TabContext value={String(value)}>
                <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
                    <TabList orientation="vertical" onChange={handleChange}>
                        {contacts.map((contact, index) => (
                            <ContactTab key={contact.id} label={contact.name} iconUrl={contact.imageUrl} {...a11yProps(index)} />
                        ))}
                    </TabList>
                </Box>
                {contacts.map((contact, index) => (
                    <TabPanel value={String(index)} {...a11yProps(index)}>
                        <Chat currentUserId='1' contactId={contact.id} />
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
};

export default ContactTabs;
