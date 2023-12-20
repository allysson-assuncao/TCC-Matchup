import * as React from "react";
import {
    AppBar,
    Box,
    Button, Container, CssBaseline,
    Grid,
    Toolbar, Typography,
} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {User} from "../../model/user";
import {useEffect} from "react";
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import getTheme from "../../theme";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


interface PropsAppBarProfile {
    editable: boolean,
    blocked: boolean,
    username: string | undefined,
    idProfile: bigint,
    openSnackBar?: (message: string) => void;
}

const AppBarProfile: React.FC<PropsAppBarProfile> = ({openSnackBar, editable, blocked, username, idProfile}) => {
    /*const {loggedUser} = useLoggedUser();
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
        blockedByMe(user);
    }, []);

    const verifyFriendship = async (user: User) => {
        try {
            if (!loggedUser) {
                console.error("Erro: Usuário não está logado.");
                return;
            }
            setFriendShip(await getFriendship(loggedUser.id, idProfile));
        } catch (error) {
            console.error("Erro ao buscar status da amizade:", error);
        }
    };

    const blockedByMe = async (user: User) => {
        try {
            let blockedByMeTemp: boolean = await isBlockedBy(idProfile, user.id);
            setBlockedByMe(blockedByMeTemp);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };*/

    return (
        <>
        </>
        /*<Box bgcolor={theme.palette.background.default}>
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

                                        {!editable && loggedUser && !blockedByMe &&(
                                            <IconButton
                                                onClick={async () => {
                                                    await block(idProfile, loggedUser.id);
                                                    verifyFriendship(loggedUser);
                                                    blockedByMe(loggedUser);
                                                }}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.text.primary}`}}
                                            >
                                                <Block color={'error'}></Block>
                                            </IconButton>
                                        )}
                                        {!editable && loggedUser && blockedByMe && (
                                            <IconButton
                                                onClick={async () => {
                                                    await unblock(loggedUser.id, idProfile);
                                                    blockedByMe(loggedUser);
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
                                        {!editable && !blockedByMe && friendship?.status != FRIENDSHIP_STATUS.ACCEPTED && (!friendship || friendship && friendship?.status == FRIENDSHIP_STATUS.REJECTED || (friendship && friendship?.status == FRIENDSHIP_STATUS.PENDING && loggedUser && friendship?.user.id == loggedUser.id)) &&(
                                            <IconButton
                                                onClick={loggedUser ? async () => {
                                                    await sendFriendshipSolicitation(loggedUser.id, idProfile);
                                                    verifyFriendship(loggedUser);
                                                    if (openSnackBar) {
                                                        openSnackBar(`A solicitação já foi enviada! Aguarde a resposta de ${username}`);
                                                    }
                                                }: () => history(ROUTE_SIGN_IN)}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.text.primary}`}}
                                                /!*disabled={(blocked || (!editable && friendship?.status == FRIENDSHIP_STATUS.PENDING && loggedUser && friendship?.user.id == loggedUser.id))}*!/
                                                disabled={(blocked || (!editable && friendship?.status == FRIENDSHIP_STATUS.PENDING && loggedUser && loggedUser.id && friendship?.user.id == loggedUser.id)) || false}

                                            >
                                                <PersonAddIcon color={(friendship?.status != FRIENDSHIP_STATUS.ACCEPTED)? "disabled": "primary" } sx={{color:`${theme.palette.primary.main}`}}></PersonAddIcon>
                                            </IconButton>
                                        )}

                                        {!editable && friendship?.status == FRIENDSHIP_STATUS.ACCEPTED && (
                                            <IconButton
                                                onClick={async () => {
                                                    if (!loggedUser) {
                                                        console.error("Erro: Usuário não está logado.");
                                                        return;
                                                    }
                                                    if(await endFriendship(loggedUser.id, idProfile)){
                                                        friendship.status = FRIENDSHIP_STATUS.REJECTED;
                                                    }
                                                }}
                                                sx={{my: 1, mx: 1.5, color: `${theme.palette.primary.main}`}}
                                                disabled={blocked}
                                            >
                                                <PersonRemove></PersonRemove>
                                            </IconButton>
                                        )}
                                        {!editable && friendship?.status == FRIENDSHIP_STATUS.PENDING && loggedUser && friendship?.user.id == loggedUser.id && (

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
        </Box>*/
    );
}

export default AppBarProfile;
