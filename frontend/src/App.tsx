import React, {useEffect, useMemo, useState} from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import './App.css';
import AppIndex from './pages/AppIndex';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Home, {getUser} from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import EditableProfile from "./pages/EditableProfile";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import EditProfile from "./containers/options/EditProfile";
import {useCustomTheme} from "./CustomThemeContext";
import {ThemeProvider} from "@mui/material/styles";
import getTheme from "./theme";
import ContactPage from "./pages/ContactPage";
import {Contact} from "./model/contact";
import {getContactsByUserId} from "./api/user_requests/contactRequests";
import {Message} from "./model/message";
import {getNotificationsByUserId} from "./api/user_requests/notificationRequests";

export const ROUTE_INDEX = '/';
export const ROUTE_HOME = '/home';
export const ROUTE_SIGN_IN = '/login';
export const ROUTE_SIGN_UP = '/cadastro';
export const ROUTE_PROFILE = '/perfil';
export const ROUTE_EDITABLE_PROFILE = '/editar_perfil';
export const ROUTE_FORGOT_PASSWORD = '/esquececu_a_senha';
export const ROUTE_SETTINGS = '/configuracoes';
export const ROUTE_ABOUT_US = '/sobre_nos';
export const ROUTE_PROFILE_SETTINGS = '/settings/profile';
export const ROUTE_CONTACT_PROTOTYPE = '/contact/prototype';

const App: React.FC = () => {

    const [contacts, setContacts] = useState<Contact[] | null>(null);

    const updateContactsWithMessage = (contactId: bigint, message: Message) => {
        // @ts-ignore
        setContacts(prevContacts => {
            if(prevContacts == null)
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
        });
    };

    const fetchContacts = async () => {
        try {
            const fetchedContacts = await getContactsByUserId(getUser().id);
            setContacts(fetchedContacts);
            return true;
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    useEffect(() => {
        if (!sessionStorage.getItem('hasRunBefore')) {

            fetchContacts();
            console.log('')

            sessionStorage.setItem('hasRunBefore', 'true');
        }
    }, []); // O array vazio como segundo argumento faz com que o efeito seja executado apenas uma vez, equivalente ao componentDidMount


    const router = useMemo(() => createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path={ROUTE_INDEX} index element={<AppIndex/>}/>
                <Route path={ROUTE_SIGN_IN} element={<SignIn setContacts={setContacts}/>}/>
                <Route path={ROUTE_SIGN_UP} element={<SignUp/>}/>
                <Route path={ROUTE_HOME} element={<Home contacts={contacts} setContacts={setContacts}/>}/>
                <Route path="/perfil/:usernamePathVariable" element={<Profile/>}/>
                <Route path={ROUTE_EDITABLE_PROFILE} element={<EditableProfile/>}/>
                <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={ROUTE_SETTINGS} element={<Settings/>}/>
                <Route path={ROUTE_ABOUT_US} element={<AboutUs/>}/>
                <Route path={ROUTE_PROFILE_SETTINGS} element={<EditProfile/>}/>
                <Route path={ROUTE_CONTACT_PROTOTYPE} element={<ContactPage contacts={contacts} setContacts={setContacts}/>}/>
            </Route>
        )
    ), []);

    const {theme} = useCustomTheme();

    return (
        <ThemeProvider theme={getTheme(theme)}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App;
