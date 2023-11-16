import React, {useState} from "react";
import {
    Grid,
    TextField,
    Button,
    Snackbar, CssBaseline, Container, Box, Avatar
} from '@mui/material';
import {getUser, updateUser} from "../../pages/Home";
import {UpdateUserPayload, User} from "../../model/user";

import {updateUserData} from "../../api/user_requests/updateUserData";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {useNavigate} from "react-router-dom";
import {ROUTE_HOME} from "../../App";


const GeneralInfoRegister = () => {
    const {theme: mode} = useCustomTheme();
    const history = useNavigate();
    const theme = getTheme(mode);
    const [image, setImage] = useState("");
    const [profilePicture, setProfilePicture] = useState(undefined);
    const [bio, setBio] = useState("");
    const [cellphoneNumber, setCellphonenumber] = useState("");
    const [open, setOpen] = React.useState(false);
    const [imageWasChanged, setImageWasChanged] = React.useState(false);


    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        setProfilePicture(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImage(reader.result);
                setImageWasChanged(true);
            }
        };

        reader.readAsDataURL(file);
    };

    function formatPhoneNumber(value: any) {
        if (!value) {
            return value;
        }

        const onlyNums = value.replace(/[^\d]/g, '');
        if (onlyNums.length <= 2) {
            setCellphonenumber(`(${onlyNums}`);
        }
        if (onlyNums.length <= 6) {
            setCellphonenumber(`(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`);
        }
        if (onlyNums.length <= 10) {
            setCellphonenumber(`(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7)}`);
        }
        setCellphonenumber(`(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`);
    }


    const handleSubmit = async () => {
        let user: UpdateUserPayload = {
            id: getUser().id,
            bio: bio,
            cellphoneNumber: cellphoneNumber,
        }

        if (imageWasChanged) {
            user.profilePicture = profilePicture;
        }
        console.log(user);
        let updatedUser: User = await updateUserData(user);

        if (!updatedUser) return;
        updateUser(updatedUser);
        setOpen(true);
        history(ROUTE_HOME);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid container alignContent={"center"} justifyContent="center" justifyItems={"center"}>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="raised-button-file">
                        <Avatar
                            alt={"Foto de Perfil"}
                            src={image}
                            style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
                    </label>
                    <TextField
                        onChange={e => {
                            const formatted = formatPhoneNumber(e.target.value);
                        }}
                        value={cellphoneNumber}
                        margin="normal"
                        fullWidth
                        id="cellphoneNumber"
                        name="cellphoneNumber"
                        label={"Número de Celular (Opcional)"}
                        autoFocus
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Bio (Opcional)"
                        variant="outlined"
                        defaultValue={bio}
                        type="text"
                        multiline
                        rows={10}
                        onChange={e => setBio(e.target.value + '')}
                    />
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit()} sx={{mt: 3}}>
                    CONCLUIR
                </Button>
                <Grid item>
                    <Snackbar
                        open={open}
                        onClose={handleClose}
                        message="Informações alteradas com sucesso!"
                    />
                </Grid>
            </Box>
        </Container>

    );
};

export default GeneralInfoRegister;