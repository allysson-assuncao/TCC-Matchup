import {
    Box,
    CssBaseline,
    Grid,
    Typography
} from "@mui/material";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import FriendComponent from "../components/Contact/FriendComponent";



const ContactContainer = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();

    return (
        <Grid container maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={1} width={'maxContent'} textAlign="center" alignItems='left' margin="auto" sx={{border: '3px solid white'}}>
                        <Typography>Teste</Typography>
                        
                    </Grid>
                    <Grid item xs={4} width={'maxContent'} alignItems='center' margin="auto" sx={{border: '3px solid', borderColor: theme.palette.primary.main}}>
                        <Typography>Teste</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )

}

export default ContactContainer;
