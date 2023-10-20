import {
    Box,
    Container,
    CssBaseline, Grid, Snackbar,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getUser} from "./Home";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import AppBarProfile from "../containers/AppBars/AppBarProfile";
import {getUserByUsername} from "../api/user_requests/getUserBy";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import ProfilePicture from "../components/ProfilePicture";
import {isBlockedBy} from "../api/user_requests/block";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const {usernamePathVariable} = useParams();
    console.log(usernamePathVariable);
    const history: NavigateFunction = useNavigate();

    const [editable, setEditability] = useState(false);
    const [idProfile, setIdProfile] = useState(BigInt(0));
    /*const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [profilePicture, setProfilePicture] = useState('');*/
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

            let user;

            if (userJSON) {
                if (usernamePathVariable == JSON.parse(userJSON).username) {
                    user = JSON.parse(userJSON);
                } else {
                    user = await getUserByUsername(usernamePathVariable);
                    let blocked: boolean = await isBlockedBy(getUser().id, user.id);
                    console.log("blocked Profile: "+ blocked);
                    setBlocked(blocked);
                    if (blocked) openSnackbar("Você foi blockeado por esse usuário, por isso não pode enviar um pedido de amizade");
                }
                setEditability(usernamePathVariable == JSON.parse(userJSON).username);
            } else {
                user = await getUserByUsername(usernamePathVariable);
                setEditability(false);
            }

            setIdProfile(user.id);
            setName(user.name);
            setBio(user.bio);

        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            {(idProfile != BigInt(0)) && (
            <AppBarProfile editable={editable} blocked={blocked} username={usernamePathVariable}
                           idProfile={idProfile} openSnackBar={openSnackbar}></AppBarProfile>)}
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
                    {idProfile ? <ProfilePicture id={idProfile} small={false}></ProfilePicture> : null}
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
        </React.Fragment>
    );
}

export default Profile;
