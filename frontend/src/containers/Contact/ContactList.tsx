import React from 'react';

const Contact = ({ name }) => <div>{name}</div>;

const ContactList = ({ contacts }) => (
    <div>
        {contacts.map((contact) => (
            <Contact key={contact.id} name={contact.name} />
        ))}
    </div>
);

export default ContactList;
