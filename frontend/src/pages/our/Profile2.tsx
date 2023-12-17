import {
    Avatar,
    Box,
    Container,
    CssBaseline, Snackbar, Stack,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {getUserByUsername} from "../../api/user_requests/getUserBy";
import {isBlockedBy} from "../../api/user_requests/block";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useSelector} from "react-redux";
import {ROUTE_MY_PROFILE} from "../../routes";
import {useTheme} from "@mui/material/styles";
import {CaretLeft} from "phosphor-react";
import ProfileForm from "../../sections/Dashboard/Settings/ProfileForm";
import {RHFTextField, RHFUploadAvatar} from "../../components/hook-form";
import {LoadingButton} from "@mui/lab";

const Profile2 = () => {
    const {user} = useSelector((state: any) => state.app);
    const {isLoggedIn} = useSelector((state: any) => state.auth);
    const theme = useTheme();

    const {usernamePathVariable} = useParams();

    console.log(usernamePathVariable);
    const history: NavigateFunction = useNavigate();

    const [editable, setEditable] = useState(false);
    const [idProfile, setIdProfile] = useState(BigInt(0));
    const [name, setName] = useState(undefined);
    const [bio, setBio] = useState(undefined);
    const [blocked, setBlocked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const openSnackbar = (msg: string) => {
        setOpen(true);
        setMessage(msg)
    };

    const closeSnackbar = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            let userJSON = localStorage.getItem('user');

            let userProfile;

            if (userJSON) {
                if (usernamePathVariable == user.username) {
                    history(ROUTE_MY_PROFILE)
                } else {
                    userProfile = await getUserByUsername(usernamePathVariable);
                    if (!user) {
                        console.error("Erro: Usuário não está logado.");
                        return;
                    }
                    let blocked: boolean = await isBlockedBy(user.id, user.id);
                    console.log("blocked MyProfile: "+ blocked);
                    setBlocked(blocked);
                    if (blocked) openSnackbar("Você foi blockeado por esse usuário, por isso não pode enviar um pedido de amizade");
                }
                setEditable(usernamePathVariable == JSON.parse(userJSON).username);
            } else {
                userProfile = await getUserByUsername(usernamePathVariable);
                setEditable(false);
            }

            setIdProfile(user.id);
            setName(user.name);
            setBio(user.bio);

        };

        fetchData();
    }, []);

    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }}>
                {/* Left Pane */}
                {/*<Box
                    sx={{
                        overflowY: "scroll",

                        height: "100vh",
                        width: 320,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background,

                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    }}
                >
                </Box>*/}

                {/* Right Pane */}
                <Box
                    sx={{
                        height: "100%",
                        width: "calc(100vw - 420px )",
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "#FFF"
                                : theme.palette.background.paper,
                        borderBottom: "6px solid #0162C4",
                    }}
                ></Box>
            </Stack>
        </>
        /*<React.Fragment>
            {/!*{(idProfile != BigInt(0)) && (
            <AppBarProfile editable={editable} blocked={blocked} username={usernamePathVariable}
                           idProfile={idProfile} openSnackBar={openSnackbar}></AppBarProfile>)}*!/}
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
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
                        backgroundColor: '9c27b0',
                    }}
                >
                    <Typography color={theme.palette.primary.main} variant="h4">{name}</Typography>
                    {/!*{idProfile ? <Avatar
                            src={current_conversation?.img}
                            alt={current_conversation?.name}
                            sx={{height: 64, width: 64}}
                        /> : null}*!/}
                    <Typography color={theme.palette.primary.main} variant="body1" align="left">{bio}</Typography>
                </Box>
                <Snackbar
                    open={open}
                    message={message}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </Container>
        </React.Fragment>*/
    );
}

export default Profile2;
