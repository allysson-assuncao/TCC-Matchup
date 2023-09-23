import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Snackbar
} from '@mui/material';
import {getUser, updateUser} from "../../pages/home/Home";
import {SignInPayload, UpdateUserPayload, User} from "../../model/user";

import {updateUserData} from "../../api/user_requests/updateUserData";

const GeneralInfo = () => {

    const [birthday, setBirthday] = useState("");
    /*const [image, setImage] = useState('');*/
    const [username, setUsername] = useState(getUser().username);
    const [bio, setBio] = useState(getUser().bio);
    const [cellphoneNumber, setCellphonenumber] = useState(getUser().cellphoneNumber);
    const [open, setOpen] = React.useState(false);

   /* const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImage(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };*/


    const handleSubmit = async () => {
        const user: UpdateUserPayload = {
            id: getUser().id,
            username: username,
            bio: bio,
            cellphoneNumber: cellphoneNumber,
        }

        let updatedUser: User = await updateUserData(user);

        if(!updatedUser) return;
        updateUser(updatedUser);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container position="fixed">
            {/*<input
                accept="image/*"
                style={{display: 'none'}}
                id="raised-button-file"
                type="file"
                onChange={handleImageUpload}
            />
            <label htmlFor="raised-button-file">
                <Avatar src={image} style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
            </label>*/}
            <Grid container spacing={2} >
                <Grid item>
                    <TextField required label="Nome de Usuário" defaultValue={username} fullWidth
                               onChange={e => setUsername(e.target.value+'')}/>
                </Grid>
                {/*<Grid item md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            defaultValue=""
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                            <MenuItem value={2}>Male</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>*/}
                <Grid item>
                    <TextField required label="Bio" type="text" fullWidth defaultValue={bio}
                               onChange={e => setBio(e.target.value+'')}
                    />
                </Grid>
                <Grid item>
                    <TextField required label="Número de Celular" type="tel" fullWidth defaultValue={cellphoneNumber}
                               onChange={e => setCellphonenumber(e.target.value+'')}/>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={() => handleSubmit()} sx={{ mt: 3 }}>Save All</Button>

            <Grid item>
                <Snackbar
                    open={open}
                    onClose={handleClose}
                    message="Informações alteradas com sucesso!"
                />
            </Grid>
        </Grid>

    );
};

export default GeneralInfo;
