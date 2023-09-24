import * as React from "react";
import {
    AppBar,
    Box,
    Button, Container, CssBaseline,
    Grid,
    Link,
    Toolbar, Typography,
    useScrollTrigger,
} from "@mui/material";
import theme from "../theme";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTE_EDITABLE_PROFILE, ROUTE_HOME, ROUTE_SIGN_IN, ROUTE_SIGN_UP} from "../App";
import ToggleColorModeButton from "../components/ToggleColorModeButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {User} from "../model/user";
import {getUser} from "../pages/home/Home";
import {useEffect, useState} from "react";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";

interface PropsAppBarProfile {
    title: string;
}

var loggedUser: User = getUser();

const AppBarProfile: React.FC<PropsAppBarProfile> = ({ title }) => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const history: NavigateFunction = useNavigate();


    return (
        <Box bgcolor={theme.palette.background.default}>
            <Container component="main">
                <CssBaseline/>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: '50px',
                        marginTop: '15px',
                        bgcolor: 'background.default',

                    }}
                >
                    <Box>
                        <Toolbar>
                            <Grid container spacing={3} alignContent='center'>
                                <Grid item xs alignItems='left' margin={'auto'}>
                                    <IconButton color="primary" onClick={() => history(ROUTE_HOME)}>
                                        <ArrowBackIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} textAlign="center" alignContent='center'  sx={{fontSize: '20px'}}>
                                    <Typography color={theme.palette.primary.main} variant="h4">{title}</Typography>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Box>
                </AppBar>
            </Container>
        </Box>
    );
}

export default AppBarProfile;