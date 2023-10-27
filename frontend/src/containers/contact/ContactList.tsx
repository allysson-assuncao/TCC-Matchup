import * as React from "react";
import {Grid, Tab, Tabs, Typography} from "@mui/material";
import {Contact} from "../../model/contact";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ProfilePicture from "../../components/ProfilePicture";

interface ContactProps {
    contacts: Contact[] | null;
    setContacts: React.Dispatch<React.SetStateAction<Contact>>;
    setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>;
}

const ContactList: React.FC<ContactProps> = ({ contacts, setContacts, setSelectedContact }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setSelectedContact(contacts[newValue]);
        console.log(newValue);
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
                {contacts && contacts.map((contact) => (
                    /*<ContactTab id={BigInt(value)} username={contact.user2Username} viewed={contact.viewed} key={contact.id.toString()}></ContactTab>*/
                    <Tab icon={<ProfilePicture id={contact.user2Id} small/>} iconPosition="start" label={contact.user2Username} key={contact.id.toString()}/>

                    /*<Tab
                        label={contact.user2Username}
                        key={contact.id.toString()}
                        component={() => <ContactTab id={contact.id} key={contact.id.toString()} username={contact.user2Username} viewed={contact.viewed} />}
                    />*/
                ))}
            </Tabs>
        </Grid>
    );
}

export default ContactList;
