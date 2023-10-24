import * as React from "react";
import {Grid, Tab, Tabs} from "@mui/material";
import ContactTab from "../../components/contact/ContactTab";
import {Contact} from "../../model/contact";

interface ContactProps {
    contacts: Contact[];
    setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>;
}

const ContactList: React.FC<ContactProps> = ({ contacts, setSelectedContact }) => {

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
                {contacts.map((contact) => (
                    /*<ContactTab id={BigInt(value)} username={contact.user2Username} viewed={contact.viewed} key={contact.id.toString()}></ContactTab>*/
                    <Tab label={contact.user2Username} key={contact.id.toString()}/>
                ))}
            </Tabs>
        </Grid>
    );
}

export default ContactList;
