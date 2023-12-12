/*import logo from '../../assets/Images/logo-matchup2.png'*/
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
import AntSwitch from "../../components/AntSwitch";
import useSettings from "../../hooks/useSettings";
import {useTheme} from "@mui/material/styles";

const AppBarIndex = () => {
    const theme = useTheme();
    const {onToggleMode} = useSettings();
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
                        <Grid item xs textAlign="left" alignItems='left' marginTop="8px">
                            {/*<img src={logo+''}/>*/}
                        </Grid>
                        <Grid item xs={6} textAlign="center" margin="auto"  sx={{fontSize: '20px'}}>
                            <nav>
                                <Button
                                    variant="text"
                                    color="secondary"
                                    onClick={() => history(ROUTE_FEATURES)}
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Funcionalidades
                                </Button>
                                <Button
                                    variant="text"
                                    color="secondary"
                                    onClick={() => history(ROUTE_ABOUT_US)}
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Contato
                                </Button>
                                <Button
                                    variant="text"
                                    color="secondary"
                                    /*onClick={() => history(ROUTE_FAQ)}*/
                                    onClick={() => history(ROUTE_REGISTER_INTERESTS)}
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Suporte
                                </Button>
                            </nav>
                        </Grid>
                        <Grid item xs textAlign="right">
                            <Box display="flex" justifyContent="flex-end">
                                {/*<ToggleColorModeButton></ToggleColorModeButton>*/}
                                <AntSwitch
                                    defaultChecked={theme.palette.mode === "dark"}
                                    onChange={onToggleMode}
                                />
                                <Button
                                    onClick={() => history(ROUTE_SIGN_UP)}
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}
                                    color="secondary"
                                >
                                    Cadastro
                                </Button>
                                <Button
                                    onClick={() => history(ROUTE_SIGN_IN)}
                                    variant="contained"
                                    sx={{ my: 1, mx: 1.5 }}
                                    color="primary"
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
