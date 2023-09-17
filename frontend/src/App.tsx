import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
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

export const ROUTE_INDEX= '/';
export const ROUTE_HOME = '/home';
export const ROUTE_SIGN_IN = '/login';
export const ROUTE_SIGN_UP = '/cadastro';
export const ROUTE_PROFILE = '/perfil';
export const ROUTE_EDITABLE_PROFILE = '/editar_perfil';
export const ROUTE_FORGOT_PASSWORD = '/esquececu_a_senha';

export const LOGGED_USER = (userData: User) => {

}


const router = createBrowserRouter(
    createRoutesFromElements(

            <Route>
                <Route path={ROUTE_INDEX} index element={<AppIndex />} />
                <Route path={ROUTE_SIGN_IN} element={<SignIn />} />
                <Route path={ROUTE_SIGN_UP} element={<SignUp />} />
                <Route path={ROUTE_HOME} element={<Home />} />
                <Route path={ROUTE_PROFILE} element={<Profile />} />
                <Route path={ROUTE_EDITABLE_PROFILE} element={<EditableProfile />} />
                <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
            </Route>

    )
)

const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
}


export default App;
