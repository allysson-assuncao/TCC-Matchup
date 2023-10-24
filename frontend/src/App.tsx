import React, {useEffect, useMemo} from 'react';
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
import ContactPage from "./pages/ContactPage";

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

    useEffect(() => {
        if (!sessionStorage.getItem('hasRunBefore')) {
            // Coloque o código que deseja executar aqui
            console.log("Código executado quando o componente é montado ou quando o usuário acessa a plataforma");
            // Pode ser uma chamada de API, manipulação de estado, etc.

            // Depois que o código for executado, defina um item na sessionStorage para que não seja executado novamente
            sessionStorage.setItem('hasRunBefore', 'true');
        }
    }, []); // O array vazio como segundo argumento faz com que o efeito seja executado apenas uma vez, equivalente ao componentDidMount


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
                <Route path={ROUTE_CONTACT_PROTOTYPE} element={<ContactPage/>}/>
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
