import * as React from "react";
import {
    AppBar,
    Box,
    Button, Container, CssBaseline,
    Grid,
    Toolbar, Typography,
} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTE_HOME, ROUTE_PROFILE_SETTINGS, ROUTE_SIGN_IN} from "../../App";
import ToggleColorModeButton from "../../components/ToggleColorModeButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {User} from "../../model/user";
import {getUser} from "../../pages/Home";
import {useEffect} from "react";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
    endFriendship,
    getFriendship,
    sendFriendshipSolicitation
} from "../../api/user_requests/friendship";
import {Block, PersonRemove} from "@mui/icons-material";
import {Friendship, FRIENDSHIP_STATUS} from "../../model/friendship";
import FriendshipResponseButtons from "../../components/contact/FriendshipResponseButtons";
import {block, isBlockedBy, unblock} from "../../api/user_requests/block";

interface PropsAppBarProfile {
    editable: boolean,
    blocked: boolean,
    username: string | undefined,
    idProfile: bigint,
    openSnackBar?: (message: string) => void;
}

var loggedUser: User = getUser();

const AppBarProfile: React.FC<PropsAppBarProfile> = ({openSnackBar, editable, blocked, username, idProfile}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history: NavigateFunction = useNavigate();
    const [friendship, setFriendShip] = React.useState<Friendship>();
    const [blockedByMe, setBlockedByMe] = React.useState(false);

    useEffect(() => {
        const userJSON = localStorage.getItem('user') + "";
        if (!userJSON) return;
        const user = JSON.parse(userJSON);
        verifyFriendship(user);
        isBlockedByMe(user);
    }, []);

    const verifyFriendship = async (user: User) => {
        try {
            setFriendShip(await getFriendship(getUser().id, idProfile));
        } catch (error) {
            console.error("Erro ao buscar status da amizade:", error);
        }
    };

    const isBlockedByMe = async (user: User) => {
        try {
            console.log(getUser().id, idProfile);

            let blockedByMeTemp: boolean = await isBlockedBy(idProfile, user.id)
            console.log(blockedByMeTemp)
            setBlockedByMe(blockedByMeTemp);
            console.log("blockedByMe: " + blockedByMe);
        } catch (error) {
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
                                        {!editable && getUser() && !blockedByMe &&(
                                            <IconButton
                                                onClick={async () => {
                                                    await block(idProfile, getUser().id);
                                                    verifyFriendship(getUser());
                                                    isBlockedByMe(getUser());
                                                }}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.text.primary}`}}
                                            >
                                                <Block color={'error'}></Block>
                                            </IconButton>
                                        )}
                                        {!editable && getUser() && blockedByMe && (
                                            <IconButton
                                                onClick={async () => {
                                                    await unblock(getUser().id, idProfile);
                                                    isBlockedByMe(getUser());
                                                }}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.text.primary}`}}
                                            >
                                                <Block color={'success'}></Block>
                                            </IconButton>
                                        )}
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
                                        {!editable && !blockedByMe && friendship?.status != FRIENDSHIP_STATUS.ACCEPTED && (!friendship || friendship && friendship?.status == FRIENDSHIP_STATUS.REJECTED || (friendship && friendship?.status == FRIENDSHIP_STATUS.PENDING && friendship?.user.id == getUser().id)) &&(
                                            <IconButton
                                                onClick={loggedUser ? async () => {
                                                    await sendFriendshipSolicitation(getUser().id, idProfile);
                                                    verifyFriendship(getUser());
                                                    if (openSnackBar) {
                                                        openSnackBar(`A solicitação já foi enviada! Aguarde a resposta de ${username}`);
                                                    }
                                                }: () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.text.primary}`}}
                                                disabled={(blocked || (!editable && friendship?.status == FRIENDSHIP_STATUS.PENDING && friendship.user.id == getUser().id))}
                                            >
                                                <PersonAddIcon color={(friendship?.status != FRIENDSHIP_STATUS.ACCEPTED)? "disabled": "primary" } sx={{color:`${theme.palette.primary.main}`}}></PersonAddIcon>
                                            </IconButton>
                                        )}

                                        {!editable && friendship?.status == FRIENDSHIP_STATUS.ACCEPTED && (
                                            <IconButton
                                                onClick={async () => {
                                                    if(await endFriendship(getUser().id, idProfile)){
                                                        friendship.status = FRIENDSHIP_STATUS.REJECTED;
                                                    }
                                                }}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.primary.main}`}}
                                                disabled={blocked}
                                            >
                                                <PersonRemove></PersonRemove>
                                            </IconButton>
                                        )}
                                        {!editable && friendship?.status == FRIENDSHIP_STATUS.PENDING && friendship.friend.id == getUser().id && (

                                            <FriendshipResponseButtons verifyFriendship={verifyFriendship}
                                                friendshipId={friendship.id}></FriendshipResponseButtons>
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
