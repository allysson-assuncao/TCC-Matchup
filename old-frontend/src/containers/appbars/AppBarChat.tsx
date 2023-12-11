import * as React from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Grid,
    Toolbar,
} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import getTheme from "../../theme";
import ProfilePicture from "../../components/ProfilePicture";
import {Contact} from "../../model/contact";

interface AppBarChatProps {
    contact: Contact;
}

const AppBarChat: React.FC<AppBarChatProps> = ({contact}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history: NavigateFunction = useNavigate();

    return (
        <Box bgcolor={theme.palette.background.default}>
            <CssBaseline/>
            <Grid
                container
                direction="row"
            >
                <Grid item xs={12} md={12}>
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: '0px',
                            marginTop: '0px',
                            transition: 'border-radius 0.3s ease, margin-top 0.3s ease',
                            bgcolor: 'background.default',
                        }}
                    >
                        <Toolbar>
                            <Grid container spacing={0} alignContent='center'>
                                <Grid container spacing={0} alignItems="center">
                                    <Grid item justifyContent={'start'}>
                                        <ProfilePicture id={contact.user2Id} small/>
                                    </Grid>
                                    <Grid item justifyContent={'center'}>
                                        {contact.user2Username}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AppBarChat;
