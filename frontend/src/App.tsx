import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements, Navigate,
    Route, RouteProps,
    RouterProvider, RoutesProps, useNavigate
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
import Features from "./pages/Features";
import FAQ from "./pages/FAQ";
import Premium from "./pages/Premium";
import RegisterInterests from "./pages/RegisterInterests";
import {USER_TYPE} from "./model/user";
import InterestManagement from "./pages/InterestManagement";

export const ROUTE_INDEX = '/';
export const ROUTE_FEATURES = '/funcionalidades';
export const ROUTE_FAQ = '/faq';
export const ROUTE_HOME = '/home';
export const ROUTE_SIGN_IN = '/login';
export const ROUTE_SIGN_UP = '/cadastro';
export const ROUTE_INTEREST_MANAGEMENT = '/seleção_de_interesses';
export const ROUTE_REGISTER_INTERESTS = '/cadastro_de_interesses';
export const ROUTE_PROFILE = '/perfil';
export const ROUTE_EDITABLE_PROFILE = '/editar_perfil';
export const ROUTE_FORGOT_PASSWORD = '/esquececu_a_senha';
export const ROUTE_SETTINGS = '/configuracoes';
export const ROUTE_ABOUT_US = '/sobre_nos';
export const ROUTE_PREMIUM = '/planos';
export const ROUTE_PROFILE_SETTINGS = '/settings/profile';
export const ROUTE_CONTACT_PROTOTYPE = '/contact/prototype';

const App: React.FC = () => {

    const [contacts, setContacts] = useState<Contact[] | null>(null);

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

    const fetchContacts = async () => {
        try {
            const fetchedContacts = await getContactsByUserId(getUser().id);
            await setContacts(fetchedContacts);
            //console.log("FETCHCONTACTS (APP)");
            //console.log(contacts);
            //console.log(fetchedContacts);
            return true;
        } catch (error) {
            console.error("Erro ao buscar CONTATOS:", error);
        }
    };

    useEffect(() => {
        //if (/* !sessionStorage.getItem('hasRunBefore') */true) {
        fetchContacts();

        console.log(contacts);

        sessionStorage.setItem('hasRunBefore', 'true');
        //}
    }, []); // O array vazio como segundo argumento faz com que o efeito seja executado apenas uma vez, equivalente ao componentDidMount

    useEffect(() => {
        console.log("USE EFFECT CONTACTS");
        console.log(contacts);
    }, [contacts]);


    interface ProtectedRouteProps {
        isAllowed: boolean;
        redirectPath?: any;
        element: any;

    }

    const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isAllowed, redirectPath = ROUTE_SIGN_IN, element}: ProtectedRouteProps) => {
        const history = useNavigate();
        useEffect(() => {

            if (!isAllowed) {

                console.log("ACESSO NEGADO!");
                console.log(getUser());
                history(redirectPath);
            }
        }, [isAllowed, history, redirectPath]);

        if (isAllowed) {
            console.log("ACESSO CONCEDIDO!");
            return element;
        } else {
            return null;
        }
    }


    const router = useMemo(() => createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path={ROUTE_INDEX} index element={<AppIndex/>}/>
                <Route path={ROUTE_FEATURES} index element={<Features/>}/>
                <Route path={ROUTE_FAQ} index element={<FAQ/>}/>
                <Route path={ROUTE_SIGN_IN} element={<SignIn setContacts={setContacts}/>}/>
                <Route path={ROUTE_SIGN_UP} element={<SignUp/>}/>
                <Route path={ROUTE_INTEREST_MANAGEMENT} element={<InterestManagement/>}/>
                <Route path={ROUTE_HOME}
                       element={<ProtectedRoute
                           isAllowed={getUser() !== null}
                           element={<Home contacts={contacts} setContacts={setContacts} updateContactsWithMessage={updateContactsWithMessage}/>

                       }/>}/>
                <Route path="/:usernamePathVariable" element={<Profile/>}/>
                <Route path={ROUTE_EDITABLE_PROFILE}
                       element={<ProtectedRoute isAllowed={getUser() !== null}  element={<EditableProfile/>}/>}/>
                <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={ROUTE_SETTINGS}
                       element={<ProtectedRoute isAllowed={getUser() !== null }  element={<Settings/>}/>}/>
                <Route path={ROUTE_ABOUT_US} element={<AboutUs/>}/>
                <Route path={ROUTE_PREMIUM} element={<Premium/>}/>
                <Route path={ROUTE_PROFILE_SETTINGS}
                       element={<ProtectedRoute isAllowed={getUser() !== null}  element={<EditProfile/>}/>}/>
                <Route path={ROUTE_CONTACT_PROTOTYPE}
                       element={<ContactPage contacts={contacts} setContacts={setContacts}
                                             updateContactsWithMessage={updateContactsWithMessage}/>}/>


                <Route path={ROUTE_REGISTER_INTERESTS}
                       element={<ProtectedRoute
                           isAllowed={getUser() && getUser().access === USER_TYPE.ADMIN}
                           redirectPath={-1}
                           element={<RegisterInterests/>}/>}/>
            </Route>
        )
    ), [contacts, setContacts, updateContactsWithMessage]);

    const {theme} = useCustomTheme();

    return (
        <ThemeProvider theme={getTheme(theme)}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App;
