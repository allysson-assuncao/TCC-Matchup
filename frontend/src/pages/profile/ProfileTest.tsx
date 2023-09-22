import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    CssBaseline,
    FormControl,
    Grid, InputLabel, MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";
import AppBarHome from "../../containers/AppBarHome";
import React, {useEffect, useState} from "react";
import logo from "../../img/logo-matchup3.png";
import {User} from "../../model/user";
import {getUser} from "../home/Home";
import theme from "../../theme";
import AppBarProfile from "../../containers/AppBarProfile";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTE_SIGN_IN} from "../../App";

var loggedUser: User = getUser();

const ProfileTest = () => {

    const history: NavigateFunction = useNavigate();

    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [bio, setBio] = useState(null);

    useEffect(() => {
        const userJSON = localStorage.getItem('user');
        if (!userJSON) {
            history(ROUTE_SIGN_IN);
        } else {
            const user = JSON.parse(userJSON);
            setLoggedUser(user);
            setImage(user.profilePicture);
            setName(user.name);
            setBio(user.bio);
        }
    }, []);

    if (!loggedUser) return null;

    return (
        <AppBarProfile></AppBarProfile>
        /*<React.Fragment>
            <Container component="main">
                <CssBaseline/>

                {/!*<Box
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
                    <Avatar alt={name} src={image} style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
                    <Typography color={theme.palette.primary.main} variant="h5">{name}</Typography>
                    <Typography color={theme.palette.primary.main} variant="body1" align="left">{bio}</Typography>
                </Box>*!/}
            </Container>
        </React.Fragment>*/
    );
}

export default ProfileTest;
