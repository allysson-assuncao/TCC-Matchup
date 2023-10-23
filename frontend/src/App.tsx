import React, {useMemo} from 'react';
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
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import EditableProfile from "./pages/EditableProfile";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import EditProfile from "./containers/options/EditProfile";
import {useCustomTheme} from "./CustomThemeContext";
import {ThemeProvider} from "@mui/material/styles";
import getTheme from "./theme";

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
    const contacts = [
        {
            id: '1',
            name: 'Contato 1',
            imageUrl: '',
        },
        {
            id: '2',
            name: 'Contato 2',
            imageUrl: '',
        },
    ];
    const router = useMemo(() => createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path={ROUTE_INDEX} index element={<AppIndex/>}/>
                <Route path={ROUTE_SIGN_IN} element={<SignIn/>}/>
                <Route path={ROUTE_SIGN_UP} element={<SignUp/>}/>
                <Route path={ROUTE_HOME} element={<Home/>}/>
                <Route path="/perfil/:usernamePathVariable" element={<Profile/>}/>
                <Route path={ROUTE_EDITABLE_PROFILE} element={<EditableProfile/>}/>
                <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={ROUTE_SETTINGS} element={<Settings/>}/>
                <Route path={ROUTE_ABOUT_US} element={<AboutUs/>}/>
                <Route path={ROUTE_PROFILE_SETTINGS} element={<EditProfile/>}/>
                <Route path={ROUTE_CONTACT_PROTOTYPE} element={<Contact/>}/>
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
