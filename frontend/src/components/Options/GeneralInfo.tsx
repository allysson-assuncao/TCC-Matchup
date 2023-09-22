import React, { useState } from "react";
import { Grid, Card, TextField, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


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
                </Grid>
                <Grid item md={6}>
                    <TextField required label="Email" type="email" placeholder="name@company.com" fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField required label="Phone" type="tel" placeholder="+12-345 678 910" fullWidth />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>Save All</Button>
        </Card>
    );
};

export default GeneralInfo;
