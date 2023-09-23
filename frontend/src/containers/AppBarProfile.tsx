import logo from '../img/logo-matchup2.png'
import * as React from "react";
import {
    AppBar,
    Box,
    Button, Container, CssBaseline,
    Grid,
    Link,
    Toolbar, Typography,
    useScrollTrigger,
} from "@mui/material";
import theme from "../theme";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTE_EDITABLE_PROFILE, ROUTE_HOME, ROUTE_PROFILE_SETTINGS, ROUTE_SIGN_IN, ROUTE_SIGN_UP} from "../App";
import ToggleColorModeButton from "../components/ToggleColorModeButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {User} from "../model/user";
import {getUser} from "../pages/home/Home";
import {useEffect, useState} from "react";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface PropsAppBarProfile {
    editable: boolean,
    username: string | undefined
}

var loggedUser: User = getUser();

const AppBarProfile: React.FC<PropsAppBarProfile> = ({ editable, username }) => {
    const history: NavigateFunction = useNavigate();

    /*const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [username, setUsername] = useState(null);*/

    useEffect(() => {
        const userJSON = localStorage.getItem('user');
        if (!userJSON) {
            history(ROUTE_SIGN_IN);
        } else {
            const user = JSON.parse(userJSON);
            /*setLoggedUser(user);
            setUsername(user.username);*/
        }
    }, []);

    if (!loggedUser) return null;

    return (
        <Box bgcolor={theme.palette.background.default}>
            <Container component="main">
                <CssBaseline/>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: '50px',
                        marginTop: '15px',
                        bgcolor: 'background.default',

                    }}
                >
                    <Box>
                        <Toolbar>
                            <Grid container spacing={3} alignContent='center'>
                                <Grid item xs alignItems='left' margin={'auto'}>
                                    <IconButton color="primary" onClick={() => history(ROUTE_HOME)}>
                                        <ArrowBackIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6} textAlign="center" margin="auto" sx={{fontSize: '20px'}}>
                                    <Typography color={theme.palette.primary.main} variant="h4">{username}</Typography>
                                </Grid>
                                <Grid item xs alignItems='left' margin='auto'>
                                    <Box margin={'auto'} display="flex" justifyContent="flex-end">
                                        <ToggleColorModeButton></ToggleColorModeButton>
                                        {editable  && (
                                            <Button
                                                onClick={() => history(ROUTE_PROFILE_SETTINGS)}
                                                variant="contained"
                                                sx={{my: 1, mx: 1.5}}
                                                color="primary"
                                            >
                                                Editar Perfil
                                            </Button>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Box>
                </AppBar>
            </Container>
        </Box>
    );
}

export default AppBarProfile;