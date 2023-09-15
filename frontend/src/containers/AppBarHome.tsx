import logo from '../img/logo-matchup2.png'
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import {Avatar, Box, Grid, MenuItem, Stack, Tab, Tabs, useScrollTrigger} from "@mui/material";
import theme from "../theme";
import {useNavigate} from "react-router-dom";
import {ROUTE_SIGN_IN, ROUTE_SIGN_UP} from "../App";
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AppBarHome = () => {
    const history = useNavigate();
    interface TabPanelProps {
        children?: React.ReactNode;
        dir?: string;
        index: number;
        value: number;
    }

    return (
        <AppBar
            position="relative"
            color="default"
            elevation={0}
            sx={{
                border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                bgcolor: 'background.default',
                borderRadius: '40px',
                width: 'max-content',

            }}
        >
            <Box

            >
                <Toolbar sx={{flexWrap: 'wrap'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="icon position tabs example"

                    >
                        <Tab icon={<PersonAddIcon />} iconPosition="start" label="Encontro" />
                        <Tab icon={<HomeIcon />} iconPosition="start" label="Menu" />
                        <Tab icon={<GroupIcon />} iconPosition="start" label="Contatos" />
                    </Tabs>

                    {/*<Grid container spacing={3} alignContent='center'>
                        <Grid item xs textAlign="left" alignItems='left' marginTop="8px">
                            <img src={logo+''}/>
                        </Grid>
                        <Grid item xs={6} textAlign="center" margin="auto"  sx={{fontSize: '20px'}}>
                            <nav>
                                <Link
                                    variant="button"
                                    color={theme.palette.secondary.main}
                                    href="#"
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Funcionalidades
                                </Link>
                                <Link
                                    variant="button"
                                    color={theme.palette.secondary.main}
                                    href="#"
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Empresa
                                </Link>

                                <Link
                                    variant="button"
                                    color={theme.palette.secondary.main}
                                    href="#"
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Suporte
                                </Link>
                            </nav>
                        </Grid>
                        <Grid item xs textAlign="right">
                            <Box display="flex" justifyContent="flex-end">
                                profile picture
                            </Box>
                        </Grid>
                    </Grid>*/}
                </Toolbar>
            </Box>
        </AppBar>
    )

}

export default AppBarHome;
