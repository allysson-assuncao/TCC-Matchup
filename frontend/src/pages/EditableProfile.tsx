import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {User} from "../model/user";
import {getUser} from "../App";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import {useCustomTheme} from "../contexts/CustomThemeContext";
import getTheme from "../theme";

var loggedUser: User = getUser();

const EditableProfile = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);

    const [image, setImage] = useState('');
    const [username, setUsername] = useState(loggedUser.username);
    const [name, setName] = useState(loggedUser.name);
    const [bio, setBio] = useState(loggedUser.bio + 'bio');
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
                    <Grid>
                        <Grid justifyContent={'center'}>
                            {isEditingUsername ? (
                                <TextField color='primary' value={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                            ) : (
                                <Typography color={theme.palette.primary.main} variant="h4">{username}</Typography>
                            )}
                        </Grid>
                        <Grid justifyContent={'left'}>
                            <IconButton color='primary' onClick={() => setIsEditingUsername(!isEditingUsername)}>
                                {isEditingUsername ? <EditIcon/> : <EditOffIcon/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="raised-button-file">
                        <Avatar alt={name} src={image} style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
                    </label>
                    {isEditingName ? (
                        <TextField value={name} onChange={(e) => setName(e.target.value)}/>
                    ) : (
                        <Typography color={theme.palette.primary.main} variant="h5">{name}</Typography>
                    )}
                    <IconButton color='primary' onClick={() => setIsEditingName(!isEditingName)}>
                        {isEditingName ? <EditIcon/> : <EditOffIcon/>}
                    </IconButton>
                    {isEditingBio ? (
                        <TextField value={bio} onChange={(e) => setBio(e.target.value)} multiline/>
                    ) : (
                        <Typography color={theme.palette.primary.main} variant="body1" align="left">{bio}</Typography>
                    )}
                    <IconButton color='primary' onClick={() => setIsEditingName(!isEditingBio)}>
                        {isEditingName ? <EditIcon/> : <EditOffIcon/>}
                    </IconButton>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default EditableProfile;
