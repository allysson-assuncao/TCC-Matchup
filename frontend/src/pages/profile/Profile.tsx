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
import React from "react";
import logo from "../../img/logo-matchup3.png";

const Profile = () => {

    return (
        <React.Fragment>
            <Grid justifyContent="center" alignItems="center">

            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} xl={8}>
                    <Card>
                        <CardContent>
                            <Typography>General information</Typography>
                            <form>
                                <Grid container spacing={3}>
                                    <Grid item md={6}>
                                        <TextField required label="First Name" placeholder="Enter your first name"/>
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField required label="Last Name" placeholder="Also your last name"/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="gender-label">Gender</InputLabel>
                                            <Select labelId="gender-label" defaultValue="">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value={10}>Female</MenuItem>
                                                <MenuItem value={20}>Male</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item md={6}>
                                        <TextField required type="email" label="Email" placeholder="name@company.com"/>
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField required type="tel" label="Phone" placeholder="+12-345 678 910"/>
                                    </Grid>
                                </Grid>
                                <Button variant="contained" color="primary" type="submit" className="mt-3">
                                    Save All
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} xl={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent className="pb-5">
                                    <img src={logo+''} alt=""/>
                                    <Typography variant="h5">Neil Sims</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">Senior Software
                                        Engineer</Typography>
                                    <Typography variant="body2" color="textSecondary" className="mb-4">New York,
                                        USA</Typography>

                                    <Button variant="contained" color="primary" size="small" className="me-2">
                                        {/*<FontAwesomeIcon icon={faUserPlus} className="me-1" />*/} Connect
                                    </Button>
                                    <Button variant="outlined" size="small">Send Message</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className="shadow-sm mb-4">
                                <CardContent>
                                    <Typography variant="h5" className="mb-4">Titulo</Typography>
                                    <Grid container alignItems="center">
                                        <img src={logo+''} alt=""/>
                                        <div className="file-field">
                                            <Grid container justifyContent="center" alignItems="center">
                                                <Grid item>
                                                    <input type="file" id="file" style={{ display: 'none' }} />
                                                    <label htmlFor="file">
                                                        <Button variant="contained" color="primary" component="span">
                                                            Choose Image
                                                        </Button>
                                                    </label>
                                                    <Typography variant="body2" color="textSecondary">JPG, GIF or PNG. Max size of 800K</Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );

}

export default Profile;
