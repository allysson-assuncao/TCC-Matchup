import {
    Box,
    CssBaseline,
    Grid, Tab, Tabs
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import getTheme from "../theme";
import {useCustomTheme} from "../CustomThemeContext";
import FriendsMenu from "../components/contact/FriendsMenu";
import ContactList from "../containers/contact/ContactList";

interface TabPanelProps {
    index: number;
    value: number;
    username: string;
    messages: string[];
}

function TabPanel(props: TabPanelProps) {
    const {value, index, username, messages, ...other} = props;

    return (
        <Grid
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
        </Grid>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Contact = () => {
    const [selectedContact, setSelectedContact] = React.useState(contacts[0]);
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();



    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            sx={{border: '3px solid white'}}
        >
            <CssBaseline/>
            {/*<Grid container spacing={2} alignItems="flex-end">*/}
            <Grid item xs={6} md={4} textAlign="center" sx={{border: '3px solid white'}}>
                <FriendsMenu></FriendsMenu>
                <ContactList contacts={contacts} setSelectedContact={setSelectedContact}></ContactList>
            </Grid>
            <Grid item xs={6} md={8} sx={{border: '3px solid', borderColor: theme.palette.primary.main}}>
                {contacts.map((contact, index) => (
                    <TabPanel value={selectedContact.id} index={contact.id} username={contact.name}
                              messages={contact.messages} key={contact.id}>
                        {selectedContact.id === contact.id && <Chat messages={contact.messages}/>}
                    </TabPanel>
                ))}
            </Grid>

        </Grid>
    );
}

export default Contact;


const Chat = ({messages}) => {
    return (
        <div>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    );
}
