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
import {Block, PersonRemove} from "@mui/icons-material";
import {Friendship, FRIENDSHIP_STATUS} from "../model/friendship";
import FriendshipResponseButtons from "../components/Contact/FriendshipResponseButtons";

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
    const [friendship, setFriendShip] = React.useState<Friendship>();

    useEffect(() => {
        const userJSON = localStorage.getItem('user')+"";
        if(!userJSON) return;
        const user = JSON.parse(userJSON);
        verifyFriendship(user);
    }, []);


    const verifyFriendship = async (user: User) => {
        try {
            console.log(getUser().id, idProfile);
            setFriendShip(await getFriendshipStatus(getUser().id, idProfile));
            console.log(friendship);
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
                                        {editable && (
                                            <Button
                                                onClick={() => history(ROUTE_PROFILE_SETTINGS)}
                                                variant="contained"
                                                sx={{my: 1, mx: 1.5}}
                                                color="primary"
                                            >
                                                Editar Perfil
                                            </Button>
                                        )}
                                        {!editable && !friendship &&(
                                            <IconButton
                                                onClick={loggedUser? () => sendFriendshipSolicitation(getUser().id, idProfile): () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.text.primary}`}}
                                                disabled={blocked}
                                            >
                                                <PersonAddIcon></PersonAddIcon>
                                            </IconButton>
                                        )}
                                        {!editable && (
                                            <Block color={'error'}></Block>
                                        )}
                                        {!editable && friendship?.status == FRIENDSHIP_STATUS.ACCEPTED && (
                                            <IconButton
                                                onClick={loggedUser? () => sendFriendshipSolicitation(getUser().id, idProfile): () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.primary.main}`}}
                                                disabled={blocked}
                                            >
                                                <PersonRemove></PersonRemove>
                                            </IconButton>
                                        )}
                                        {!editable && friendship?.status == FRIENDSHIP_STATUS.PENDING && friendship.friend.id == getUser().id &&(
                                            <IconButton
                                                onClick={loggedUser? () => sendFriendshipSolicitation(getUser().id, idProfile): () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.primary.main}`}}
                                                disabled={blocked}
                                            >
                                                <FriendshipResponseButtons friendshipId={friendship.id}></FriendshipResponseButtons>
                                            </IconButton>
                                        )}
                                        {!editable && friendship?.status == FRIENDSHIP_STATUS.PENDING && friendship.user.id == getUser().id && (
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
