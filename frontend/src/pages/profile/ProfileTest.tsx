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
import AppBarProfile from "../../containers/AppBarProfile";

var loggedUser: User = getUser();

const ProfileTest = () => {

    const [image, setImage] = useState('');
    const [name, setName] = useState('Name');
    const [bio, setBio] = useState('Bio');

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
