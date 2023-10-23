import * as React from "react";
import {Grid, Tabs} from "@mui/material";
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
                    <ContactTab id={BigInt(value)} name={contact.user2Username} viewed={contact.viewed}></ContactTab>
                    /*<Tab label={contact.name} key={contact.id}/>*/
                ))}
            </Tabs>
        </Grid>
    );
}

export default ContactList;
