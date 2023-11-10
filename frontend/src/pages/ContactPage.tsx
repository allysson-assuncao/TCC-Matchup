import {
    CssBaseline,
    Grid
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import getTheme from "../theme";
import {useCustomTheme} from "../CustomThemeContext";
import FriendsMenu from "../components/contact/FriendsMenu";
import ContactList from "../containers/contact/ContactList";
import {Contact} from "../model/contact";
import {Message, MESSAGE_TYPE} from "../model/message";
import Chat from "../containers/contact/Chat";

interface TabPanelProps {
    selectedContactId: bigint;
    contact: Contact;
    updateContactsWithMessage: (contactId: bigint, message: Message) => void;
}

function TabPanel(props: TabPanelProps) {
    const {selectedContactId, contact, updateContactsWithMessage, ...other} = props;

    return (
        <Grid
            role="tabpanel"
            hidden={selectedContactId !== contact.id}
            id={`vertical-tabpanel-${contact.id}`}
            aria-labelledby={`vertical-tab-${contact.id}`}
            style={{ height: '100%', width: '100%' }}
            {...other}
        >
            {selectedContactId === contact.id && <Chat contact={contact} updateContactsWithMessage={updateContactsWithMessage}/>}
        </Grid>
    );
}

interface ContactPageProps {
    contacts: Contact[] | null;
    setContacts: React.Dispatch<React.SetStateAction<Contact[] | null>>;
    updateContactsWithMessage: (contactId: bigint, message: Message) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({contacts, setContacts, updateContactsWithMessage}) => {
    const [selectedContact, setSelectedContact] = React.useState(contacts? contacts[0]: null);
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();
    console.log("CONTATOS:");
    console.log(contacts);

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
                <ContactList contacts={contacts} setSelectedContact={setSelectedContact} setContacts={setContacts}></ContactList>
            </Grid>
            <Grid item xs={6} md={8} sx={{border: '3px solid', borderColor: theme.palette.primary.main, height: '100%', width: '100%'}} >
                {contacts && contacts.map((contact) => (
                    <TabPanel contact={contact} key={contact.id.toString()} selectedContactId={selectedContact ? selectedContact.id : BigInt(-1)} updateContactsWithMessage={updateContactsWithMessage}/>
                ))}
            </Grid>
        </Grid>
    );
}

export default ContactPage;
