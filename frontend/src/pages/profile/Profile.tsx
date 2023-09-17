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
import React, {useState} from "react";
import logo from "../../img/logo-matchup3.png";
import {User} from "../../model/user";
import {getUser} from "../home/Home";
import theme from "../../theme";

var loggedUser: User = getUser();

const Profile = () => {

    /*const [image, setImage] = useState(loggedUser.profilePicture);*/
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('username');
    const [name, setName] = useState('name');
    const [bio, setBio] = useState('bio');

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
                    <Typography color='background.paper' variant="h4">{username}</Typography>
                    <Avatar alt={name} src={image} style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
                    <Typography color='background.paper' variant="h5">{name}</Typography>
                    <Typography color='background.paper' variant="body1" align="left">{bio}</Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Profile;
