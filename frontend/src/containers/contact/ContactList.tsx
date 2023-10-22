import React from 'react';
import Grid from "@mui/material/Grid";
import {Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";

interface TabPanelProps {
    index: number;
    value: number;
    username: string;
}

function TabPanel(props: TabPanelProps) {
    const {value, index, username, ...other} = props;

    return (
        <Grid
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{username}</Typography>
                </Box>
            )}
        </Grid>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ContactList = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const contacts = [
        {id: 1, name: 'Contato 1'},
        {id: 2, name: 'Contato 2'},
        {id: 3, name: 'Contato 3'},
        {id: 4, name: 'Contato 4'},
        {id: 5, name: 'Contato 5'}
    ];

    return (
        <Grid container>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {contacts.map((contact, index) => (
                    <Tab label={contact.name} {...a11yProps(index)} key={contact.id} />
                ))}
            </Tabs>
            {contacts.map((contact, index) => (
                <TabPanel value={value} index={index} username={contact.name} key={contact.id}/>
            ))}
        </Grid>
    );
}
export default ContactList;
