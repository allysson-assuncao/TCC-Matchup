import * as React from "react";
import {
    AppBar,
    Box,
    Button,
    Grid,
    Toolbar,
    useScrollTrigger,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {
    ROUTE_ABOUT_US,
    ROUTE_FAQ,
    ROUTE_FEATURES,
    ROUTE_REGISTER_INTERESTS,
    ROUTE_SIGN_IN,
    ROUTE_SIGN_UP
} from "../../App2";
import {useTheme} from "@mui/material/styles";
// @ts-ignore
import Logo from "../../assets/Images/logo.ico";
import {ROUTE_LOGIN, ROUTE_REGISTER} from "../../routes";
import {GameController} from "phosphor-react";

const AppBarIndex = () => {
    const theme = useTheme();
    const history = useNavigate();

    function isScrolled() {
        return window.scrollY > 2;
    }

    const scrolled = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return (
        <AppBar
            position="fixed"
            color="default"
            elevation={0}
            sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: scrolled || isScrolled() ? '0px' : '50px',
                marginTop: scrolled || isScrolled() ? '0px' : '15px',
                transition: 'border-radius 0.3s ease, margin-top 0.3s ease',
                bgcolor: 'background.default',
            }}
        >
            <Box>
                <Toolbar >
                    <Grid container spacing={3} alignContent='center'>
                        <Grid item xs>
                            <GameController size={64} color={theme.palette.primary.main}/>
                        </Grid>
                        <Grid item xs={6} textAlign="center" margin="auto"  sx={{fontSize: '20px'}}>
                            <nav>
                                <Button
                                    variant="text"
                                    onClick={() => history(ROUTE_FEATURES)}
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Funcionalidades
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => history(ROUTE_ABOUT_US)}
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Contato
                                </Button>
                                <Button
                                    variant="text"
                                    /*onClick={() => history(ROUTE_FAQ)}*/
                                    onClick={() => history(ROUTE_REGISTER_INTERESTS)}
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Suporte
                                </Button>
                            </nav>
                        </Grid>
                        <Grid item xs>
                            <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%">
                                <Button
                                    onClick={() => history(`/auth/${ROUTE_REGISTER}`)}
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Cadastro
                                </Button>
                                <Button
                                    onClick={() => history(`/auth/${ROUTE_LOGIN}`)}
                                    variant="contained"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Box>
        </AppBar>
    );
}

export default AppBarIndex;
