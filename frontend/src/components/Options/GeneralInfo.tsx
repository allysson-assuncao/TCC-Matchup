import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Snackbar
} from '@mui/material';
import {getUser, updateUser} from "../../pages/home/Home";
import {SignInPayload, UpdateUserPayload, User} from "../../model/user";

import {updateUserData} from "../../api/login_requests/updateUserData";

const GeneralInfo = () => {
    const [birthday, setBirthday] = useState("");

    return (
        <Card sx={{ p: 2, mb: 4 }}>
            <h5>General information</h5>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <TextField required label="First Name" placeholder="Enter your first name" fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField required label="Last Name" placeholder="Also your last name" fullWidth />
                </Grid>
                <Grid item md={6}>
                    {/*Date*/}
                </Grid>
                <Grid item md={6}>
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
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>Save All</Button>
        </Card>
    );
};

export default GeneralInfo;
