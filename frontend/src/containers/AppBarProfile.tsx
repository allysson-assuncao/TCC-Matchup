import * as React from "react";
import {
    AppBar,
    Box,
    Button, Container, CssBaseline,
    Grid,
    Toolbar, Typography,
} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTE_HOME, ROUTE_PROFILE_SETTINGS, ROUTE_SIGN_IN, ROUTE_SIGN_UP} from "../App";
import ToggleColorModeButton from "../components/ToggleColorModeButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {User} from "../model/user";
import {getUser} from "../pages/home/Home";
import {useEffect} from "react";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {areUsersFriends, getFriendshipStatus, sendFriendshipSolicitation} from "../api/user_requests/friendship";
import {getNotificationsByUserId} from "../api/user_requests/notificationRequests";
import {PersonRemove} from "@mui/icons-material";
import {FRIENDSHIP_STATUS} from "../model/friendship";

interface PropsAppBarProfile {
    editable: boolean,
    blocked: boolean,
    username: string | undefined,
    idProfile: bigint
}

var loggedUser: User = getUser();

const AppBarProfile: React.FC<PropsAppBarProfile> = ({editable, blocked, username, idProfile}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history: NavigateFunction = useNavigate();
    const [friendshipStatus, setFriendShipStatus] = React.useState('');

    useEffect(() => {
        const userJSON = localStorage.getItem('user')+"";
        if(!userJSON) return;
        const user = JSON.parse(userJSON);
        verifyFriendship(user);
    }, []);


    const verifyFriendship = async (user: User) => {
        try {
            setFriendShipStatus(await getFriendshipStatus(user.id, idProfile));
        } catch (error) {
            // Trate erros da requisição aqui, se necessário
            console.error("Erro ao buscar notificações:", error);
        }
    };

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
                                        {editable && friendshipStatus == "" &&(
                                            <Button
                                                onClick={() => history(ROUTE_PROFILE_SETTINGS)}
                                                variant="contained"
                                                sx={{my: 1, mx: 1.5}}
                                                color="primary"
                                            >
                                                Editar Perfil
                                            </Button>
                                        )}
                                        {!editable && !friendshipStatus &&(
                                            <IconButton
                                                onClick={loggedUser? () => sendFriendshipSolicitation(getUser().id, idProfile): () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.text.primary}`}}
                                                disabled={blocked}
                                            >
                                                <PersonAddIcon></PersonAddIcon>
                                            </IconButton>
                                        )}
                                        {!editable && friendshipStatus == FRIENDSHIP_STATUS.ACCEPTED &&(
                                            <IconButton
                                                onClick={loggedUser? () => sendFriendshipSolicitation(getUser().id, idProfile): () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.primary.main}`}}
                                                disabled={blocked}
                                            >
                                                <PersonRemove></PersonRemove>
                                            </IconButton>
                                        )}
                                        {!editable && friendshipStatus == FRIENDSHIP_STATUS.PENDING &&(
                                            <IconButton
                                                onClick={loggedUser? () => sendFriendshipSolicitation(getUser().id, idProfile): () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.primary.main}`}}
                                                disabled={blocked}
                                            >
                                                <PersonRemove></PersonRemove>
                                            </IconButton>
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
