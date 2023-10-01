import {
    Alert,
    Box,
    Button,
    Checkbox, Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import theme from "../../theme";
import {ROUTE_PROFILE, ROUTE_SIGN_IN} from "../../App";
import React, {useEffect, useState} from "react";
import {User} from "../../model/user";
import {NavigateFunction, useNavigate} from "react-router-dom";
import AppBarHome from "../../containers/AppBarHome";
import logo from '../img/logo-matchup2.png'
import getTheme from "../../theme";
import {useCustomTheme} from "../../CustomThemeContext";

var loggedUser: User;

var history: NavigateFunction;

function isLogged() {
    const userJSON = localStorage.getItem('user');
    if (!userJSON) {
        history('/login');
    } else {
        loggedUser = JSON.parse(userJSON);
    }
}

export const setUser = () => {
    loggedUser = JSON.parse('' + localStorage.getItem('user'));
}

export const getUser = () => {
    setUser();
    return loggedUser;
}


export const updateUser = (user: User) => {
    removeUser()
    localStorage.setItem('user', JSON.stringify(user));
    setUser();
    return loggedUser;
}

const removeUser = () => {
    localStorage.removeItem('user');
}

export const logout = () => {
    removeUser();
    history(ROUTE_SIGN_IN);
}

const Home = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    history = useNavigate();
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [profileRoute, setProfileRoute] = useState(ROUTE_PROFILE);

    useEffect(() => {
        const userJSON = localStorage.getItem('user');
        if (!userJSON) {
            history(ROUTE_SIGN_IN);
        } else {
            const user = JSON.parse(userJSON);
            setLoggedUser(user);
            setProfileRoute(`/perfil/${user.username}`);
        }
    }, []);

    setUser();

    console.log('HOME');
    console.log(loggedUser);
    if (!loggedUser) return null;

    return (
           <AppBarHome></AppBarHome>


        /*<Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                /!*sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 550,
                    minWidth: 450,
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: `1px solid${theme.palette.primary.main}`,
                    padding: '40px',
                    borderRadius: '16px',
                }}*!/
            >
                {/!*!//<Avatar  src='/src/assets/brand/logo-matchup.jpeg'/>*!/}

                {/!*<Typography component="h1" variant="h5">
                    Eae {loggedUser.name}
                </Typography>*!/}

            </Box>
        </Container>*/
    )

}

export default Home;
