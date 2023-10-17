/*
import {
    Box,
    CssBaseline,
    Grid,
    Typography
} from "@mui/material";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import FriendComponent from "../../components/Contact/FriendComponent";
import FriendsMenu from "../../components/Contact/FriendsMenu";
import ChatWindow from "../../components/Contact/teste";
import ContactList from "../../containers/Contact/ContactList";

const Contact = () => {
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
                    width: 'fullwidth',
                }}
            >
                {/!*<Grid container spacing={2}>
                    <Grid item xs={1} width={'maxContent'} textAlign="center" alignItems='left' margin="auto" sx={{border: '3px solid white'}}>
                        <Typography>Teste</Typography>
                        <FriendsMenu></FriendsMenu>
                        <ChatWindow/>
                    </Grid>
                    <Grid item xs={4} width={'maxContent'} alignItems='center' margin="auto" sx={{border: '3px solid', borderColor: theme.palette.primary.main}}>
                        <Typography>Teste</Typography>
                    </Grid>
                </Grid>*!/}
                <Grid container spacing={2} justifyContent="space-between" sx={{width: 'fullwidth'}}>
                    <Grid item xs={3} textAlign="center" alignItems='left' sx={{ border: '3px solid white', height: '85vh', width: '20vw' }}>
                         Barra lateral (contendo a lista de contatos, a barra de busca e o botão de mostrar os amigos): deve ocupar 25% da tela
                        Barra Lateral
                    </Grid>
                    <Grid item xs sx={{ border: '3px solid', borderColor: theme.palette.primary.main, height: '85vh', width: '3vw' }}>
                         Chat: deve ocupar 75% da tela
                        Chat
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="space-between" sx={{width: 'fullwidth'}}>
                    <Grid item xs={3} textAlign="center" alignItems='left' sx={{ border: '3px solid white', height: '85vh', width: '20vw' }}>
                        <FriendsMenu></FriendsMenu>
                        <ContactList></ContactList>
                    </Grid>
                    <Grid item xs sx={{ border: '3px solid', borderColor: theme.palette.primary.main, height: '85vh', width: '3vw' }}>

                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

export default Contact;
*/
