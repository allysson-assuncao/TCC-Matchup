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
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();

    const contacts = [
        {id: 1, name: 'Contato 1', messages: ['Mensagem 1', 'Mensagem 2']},
        {id: 2, name: 'Contato 2', messages: ['Mensagem 3', 'Mensagem 4']},
    ];
    const [selectedContact, setSelectedContact] = React.useState(contacts[0]);

    return (
        <Grid container maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'fullwidth',
                }}
            >
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={6} md={4} width={'maxContent'} textAlign="center" alignItems='left' margin="auto" sx={{border: '3px solid white'}}>
                        <FriendsMenu></FriendsMenu>
                        <ContactList contacts={contacts} setSelectedContact={setSelectedContact}></ContactList>
                    </Grid>
                    <Grid item xs={6} md={2} width={'maxContent'} alignItems='center' margin="auto" sx={{border: '3px solid', borderColor: theme.palette.primary.main}}>
                        {contacts.map((contact, index) => (
                            <TabPanel value={selectedContact.id} index={contact.id} username={contact.name} messages={contact.messages} key={contact.id}>
                                {selectedContact.id === contact.id && <Chat messages={contact.messages} />}
                            </TabPanel>
                        ))}
                    </Grid>
                </Grid>
                {/*<Grid container spacing={2} justifyContent="space-between" sx={{width: 'fullwidth'}}>
                    <Grid item xs={3} textAlign="center" alignItems='left' sx={{ border: '3px solid white', height: '85vh', width: '20vw' }}>
                         Barra lateral (contendo a lista de contatos, a barra de busca e o botão de mostrar os amigos): deve ocupar 25% da tela
                        Barra Lateral
                    </Grid>
                    <Grid item xs sx={{ border: '3px solid', borderColor: theme.palette.primary.main, height: '85vh', width: '3vw' }}>
                         Chat: deve ocupar 75% da tela
                        Chat
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="space-between" sx={{width: 'fullwidth'}}>
                    <Grid item xs={3} textAlign="center" alignItems='left' sx={{ border: '3px solid white', height: '85vh', width: '20vw' }}>
                        <FriendsMenu></FriendsMenu>
                        <ContactList></ContactList>
                    </Grid>
                    <Grid item xs sx={{ border: '3px solid', borderColor: theme.palette.primary.main, height: '85vh', width: '3vw' }}>

                    </Grid>
                </Grid>*/}
            </Box>
        </Grid>
    );
}

export default Contact;
const ContactList = ({contacts, setSelectedContact}) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setSelectedContact(contacts[newValue]);
    };

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
        </Grid>
    );
}

const Chat = ({messages}) => {
    return (
        <div>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    );
}
