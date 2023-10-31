import * as React from "react";
import {
    AppBar,
    Box,
    Container,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {User} from "../../model/user";
import {getUser} from "../../pages/Home";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";

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
                                    <IconButton color="primary" onClick={() => history(-1)}>
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