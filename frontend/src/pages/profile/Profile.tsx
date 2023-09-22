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
import {ROUTE_SIGN_IN} from "../../App";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import AppBarProfile from "../../containers/AppBarProfile";

const Profile = () => {
    const {usernamePathVariable} = useParams();
    console.log(usernamePathVariable);
    const history: NavigateFunction = useNavigate();

    const [editable, setEditability] = useState(false);

    const [loggedUser, setLoggedUser] = useState<User | null>(null);

    useEffect(() => {
            const userJSON = localStorage.getItem('user');
            if (!userJSON) {
                history(ROUTE_SIGN_IN);
            } else {
                let user;
                user = JSON.parse(userJSON);
                if (usernamePathVariable == JSON.parse(userJSON).username) {
                    setEditability(true);
                }else{
                    setEditability(false);
                }
                setLoggedUser(user);
                setImage(user.profilePicture);
                setName(user.name);
                setBio(user.bio);
            }
        }, []
    );

    if (!loggedUser) return null;

    const [image, setImage] = useState(loggedUser.profilePicture);
    const [username, setUsername] = useState(loggedUser.username);
    const [name, setName] = useState(loggedUser.name);
    const [bio, setBio] = useState(loggedUser.bio);

    return (
        <React.Fragment>
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
                    <Typography color={theme.palette.primary.main} variant="h4">{username}</Typography>
                    <Avatar alt={name} src={image} style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
                    <Typography color={theme.palette.primary.main} variant="h5">{name}</Typography>
                    <Typography color={theme.palette.primary.main} variant="body1" align="left">{bio}</Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Profile;
