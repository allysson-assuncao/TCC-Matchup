import * as React from "react";
import {Grid, Tab, Tabs, Typography} from "@mui/material";
import {Contact} from "../../model/contact";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ProfilePicture from "../../components/ProfilePicture";
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import getTheme from "../../theme";

interface ContactProps {
    contacts: Contact[] | null;
    setContacts: React.Dispatch<React.SetStateAction<Contact[] | null>>;
    setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
}

const ContactList: React.FC<ContactProps> = ({ contacts, setContacts, setSelectedContact }) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (contacts) {
            setSelectedContact(contacts[newValue]);
        }
        console.log(newValue);
    };

    return (
        <Grid>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {contacts && contacts.map((contact) => (
                    <Tab
                        icon={
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <ProfilePicture id={contact.user2Id} small/>
                                </Grid>
                                <Grid item>
                                    {contact.user2Username}
                                </Grid>
                            </Grid>
                        }
                        iconPosition="start"
                        key={contact.id.toString()}
                    />
                        /*<Tab icon={
                            <ProfilePicture id={contact.user2Id} small/>
                        }
                             iconPosition="start" label={contact.user2Username} key={contact.id.toString()}/>*/
                ))}
            </Tabs>
        </Grid>
    );
}

export default ContactList;
