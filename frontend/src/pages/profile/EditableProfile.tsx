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
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import theme from "../../theme";

var loggedUser: User = getUser();

const EditableProfile = () => {

    /*const [image, setImage] = useState(loggedUser.profilePicture);*/
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('username');
    const [name, setName] = useState('name');
    const [bio, setBio] = useState('bio');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);

    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImage(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    // Atualiza o estado quando o usuário muda
    useEffect(() => {
        setImage('');
        setUsername('username2');
        setName('name2');
        setBio('bio2');
    }, [loggedUser]);

    const handleSaveClick = () => {
        // Aqui você pode fazer a chamada para a API para atualizar os dados do usuário
        console.log('Salvar alterações');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" bgcolor={theme.palette.background.default}>
            {isEditingUsername  ? (
                <TextField color='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            ) : (
                <Typography color={theme.palette.primary.main} variant="h4">{username}</Typography>
            )}
            <IconButton color='primary' onClick={() => setIsEditingUsername(!isEditingUsername)}>
                {isEditingUsername ? <EditIcon /> : <EditOffIcon />}
            </IconButton>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageUpload}
            />
            <label htmlFor="raised-button-file">
                <Avatar alt={name} src={image} style={{ width: '100px', height: '100px', cursor: 'pointer' }} />
            </label>
            {isEditingName ? (
                <TextField value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
                <Typography color={theme.palette.primary.main} variant="h5">{name}</Typography>
            )}
            <IconButton color='primary' onClick={() => setIsEditingName(!isEditingName)}>
                {isEditingName ? <EditIcon /> : <EditOffIcon />}
            </IconButton>
            {isEditingBio ? (
                <TextField value={bio} onChange={(e) => setBio(e.target.value)} multiline />
            ) : (
                <Typography color={theme.palette.primary.main} variant="body1" align="left">{bio}</Typography>
            )}
            <IconButton color='primary' onClick={() => setIsEditingName(!isEditingBio)}>
                {isEditingName ? <EditIcon /> : <EditOffIcon />}
            </IconButton>
        </Box>
    );
}

export default EditableProfile;
