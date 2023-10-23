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
}

function TabPanel(props: TabPanelProps) {
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

const contacts: Contact[] = [
    {
        id: BigInt(1),
        user1Id: BigInt(1),
        user2Id: BigInt(2),
        user2Username: 'Contato 1',
        viewed: false,
        messages: [
            {
                id: BigInt(1),
                date: new Date(),
                senderId: BigInt(1),
                receiverId: BigInt(2),
                viewed: false,
                messageType: MESSAGE_TYPE.TEXT,
                hashedImage: '',
                hashedAudio: '',
                hashedText: 'Mensagem 2'
            }
        ]
    },
    {
        id: BigInt(2),
        user1Id: BigInt(3),
        user2Id: BigInt(4),
        user2Username: 'Contato 2',
        viewed: false,
        messages: [
            {
                id: BigInt(3),
                date: new Date(),
                senderId: BigInt(3),
                receiverId: BigInt(4),
                viewed: false,
                messageType: MESSAGE_TYPE.TEXT,
                hashedImage: '',
                hashedAudio: '',
                hashedText: 'Mensagem 3'
            },
            {
                id: BigInt(4),
                date: new Date(),
                senderId: BigInt(3),
                receiverId: BigInt(4),
                viewed: false,
                messageType: MESSAGE_TYPE.TEXT,
                hashedImage: '',
                hashedAudio: '',
                hashedText: 'Mensagem 4'
            }
        ]
    }
];


const ContactPage = () => {
    const [selectedContact, setSelectedContact] = React.useState(contacts[0]);
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();

    // @ts-ignore
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
                {contacts.map((contact) => (
                    <TabPanel contact={contact} key={contact.id.toString()} selectedContactId={selectedContact.id}/>
                ))}
            </Grid>
        </Grid>
    );
}

export default ContactPage;
