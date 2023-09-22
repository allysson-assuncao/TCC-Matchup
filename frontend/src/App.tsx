import React, {useEffect, useMemo, useState} from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider, useNavigate
} from 'react-router-dom'
import './App.css';
import AppIndex from './pages/AppIndex/AppIndex';
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {User} from "./model/user";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import EditableProfile from "./pages/profile/EditableProfile";
import AboutUs from "./pages/AboutUs/AboutUs";
import Settings from "./pages/settings/Settings";
import ProfileTest from "./pages/profile/ProfileTest";

export const ROUTE_INDEX= '/';
export const ROUTE_HOME = '/home';
export const ROUTE_SIGN_IN = '/login';
export const ROUTE_SIGN_UP = '/cadastro';
export const ROUTE_PROFILE = '/perfil';
export const ROUTE_EDITABLE_PROFILE = '/editar_perfil';
export const ROUTE_FORGOT_PASSWORD = '/esquececu_a_senha';
export const ROUTE_SETTINGS = '/configuracoes';
export const ROUTE_ABOUT_US = '/sobre_nos';

export const ROUTE_PROFILE_TEST = '/teste_perfil';

export const LOGGED_USER = (userData: User) => {

}


const App: React.FC = () => {
    const router = useMemo(() => createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path={ROUTE_INDEX} index element={<AppIndex />} />
                <Route path={ROUTE_SIGN_IN} element={<SignIn />} />
                <Route path={ROUTE_SIGN_UP} element={<SignUp />} />
                <Route path={ROUTE_HOME} element={<Home />} />
                <Route path="/perfil/:usernamePathVariable" element={<Profile />} />
                <Route path={ROUTE_EDITABLE_PROFILE} element={<EditableProfile />} />
                <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTE_SETTINGS} element={<Settings />} />
                <Route path={ROUTE_ABOUT_US} element={<AboutUs />} />

                <Route path={ROUTE_PROFILE_TEST} element={<ProfileTest />} />
            </Route>
        )
    ), []);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
