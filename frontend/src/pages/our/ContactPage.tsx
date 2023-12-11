import {
    CssBaseline,
    Grid
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import getTheme from "../theme";
import {useCustomTheme} from "../contexts/CustomThemeContext";
import FriendsMenu from "../components/contact/FriendsMenu";
import ContactList from "../containers/contact/ContactList";
import {Contact} from "../model/contact";
import {Message, MESSAGE_TYPE} from "../model/message";
import Chat from "../containers/contact/Chat";
import {useContact} from "../contexts/ContactsContext";

interface TabPanelProps {
    selectedContactId: bigint;
    contact: Contact;
}

function TabPanel(props: TabPanelProps) {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const {selectedContactId, contact, ...other} = props;

    return (
        <Grid
            role="tabpanel"
            hidden={selectedContactId !== contact.id}
            id={`vertical-tabpanel-${contact.id}`}
            aria-labelledby={`vertical-tab-${contact.id}`}
            {...other}
        >
            {selectedContactId === contact.id && <Chat contact={contact}/>}
        </Grid>
    );
}

const ContactPage: React.FC = () => {
    const {contacts, setContacts} = useContact();
    const [selectedContact, setSelectedContact] = React.useState(contacts? contacts[0]: null);
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();


    return (
        <Grid
            container
            /*direction="row"
            justifyContent="space-around"*/
            sx={{border: '3px solid blue', height: '75vh'}}
        >
            <CssBaseline/>
            <Grid item xs={1} md={3} textAlign="center" sx={{border: '3px solid green', weight: '40vh'}}>
                <FriendsMenu></FriendsMenu>
                <ContactList contacts={contacts} setSelectedContact={setSelectedContact} setContacts={setContacts}></ContactList>
            </Grid>
            <Grid item xs={4} md={9} sx={{weight: '60vh'}} >
                {contacts && contacts.map((contact) => (
                    <TabPanel contact={contact} key={contact.id.toString()} selectedContactId={selectedContact ? selectedContact.id : BigInt(-1)}/>
                ))}
            </Grid>
        </Grid>
    );
}

export default ContactPage;
