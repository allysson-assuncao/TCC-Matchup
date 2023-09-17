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
            <Box display="flex" flexDirection="column" alignItems="center" bgcolor={theme.palette.background.default}>
                <Typography color='background.paper' variant="h4">{username}</Typography>
                <Avatar alt={name} src={image} style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
                <Typography color='background.paper' variant="h5">{name}</Typography>
                <Typography color='background.paper' variant="body1" align="left">{bio}</Typography>
            </Box>
        </React.Fragment>
    );
}

export default Profile;
