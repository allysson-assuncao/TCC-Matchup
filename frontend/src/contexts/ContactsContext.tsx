import React, {createContext, useState, useContext, useEffect} from 'react';
import {Contact} from "../model/contact";
import {Message} from "../model/message";
import {getContactsByUserId} from "../api/user_requests/contactRequests";
import {useLoggedUser} from "./UserContext";
import {Client} from "@stomp/stompjs";

interface ContactContextData {
    contacts: Contact[] | null;
    setContacts: React.Dispatch<React.SetStateAction<Contact[] | null>>;
    updateContactsWithMessage: (contactId: bigint, message: Message) => void;
    fetchContacts: () => void;
    subscribeUser: () => void;
}

const ContactContext = createContext<ContactContextData>({} as ContactContextData);

interface ContactsProviderProps {
    children: React.ReactNode;
}

export const ContactsProvider: React.FC<ContactsProviderProps> = ({children}) => {
    const [contacts, setContacts] = useState<Contact[] | null>(null);

    const {loggedUser} = useLoggedUser();

    const [client, setClient] = useState<Client | null>(null);
/*
    const [message, setMessage] = useState<Message>({senderId: BigInt(0), receiverId: 0, hashedText: '', messageType: "TEXT", viewed: false});
*/
    const [text, setText] = useState<string>("");
    const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

    const updateContactsWithMessage = (contactId: bigint, message: Message) => {
        setContacts(prevContacts => {
            if (prevContacts == null) { // @ts-ignore
                return prevContacts.map(contact => {
                    if (contact.id === contactId) {
                        return {
                            ...contact,
                            messages: [...contact.messages, {...message}]
                        };
                    } else {
                        return contact;
                    }
                });
            }
        });
    };

    const subscribeUser = () => {
        if (!loggedUser) {
            console.error("Erro: Usuário não está logado.");
            return false;
        }
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                username: loggedUser?.username,
                password: loggedUser?.hashedPassword,
                simpUser: loggedUser?.id.toString()
            },
            debug: (str) => {
                console.log(str);
            },

            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = (frame) => {
            client.subscribe(`/user/${loggedUser.id}/queue/private-messages`, (msg) => {
                const message: Message = JSON.parse(msg.body)
                updateContactsWithMessage(message.receiverContactId, message);
                /*console.log(message);
                setReceivedMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);*/
            });
        };

        client.activate();
        setClient(client);
    }

    const fetchContacts = async () => {
        if (!loggedUser) {
            console.error("Erro: Usuário não está logado.");
            return false;
        }
        try {
            const fetchedContacts = await getContactsByUserId(loggedUser.id);
            await setContacts(fetchedContacts);
            return true;
        } catch (error) {
            console.error("Erro ao buscar CONTATOS:", error);
        }
        subscribeUser();
    };

    useEffect(() => {
        if(contacts){
            sessionStorage.setItem('contacts', JSON.stringify(contacts));
        }
        }, [contacts]);

    return (
        <ContactContext.Provider value={{contacts, setContacts, updateContactsWithMessage, fetchContacts, subscribeUser}}>
            {children}
        </ContactContext.Provider>
    );
};

export function useContact(): ContactContextData {
    const context = useContext(ContactContext);

    if (!context) {
        throw new Error('useContact must be used within an ContactProvider');
    }

    return context;
}
