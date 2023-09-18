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
        <React.Fragment>
            <Box
                maxWidth="xs"
                bgcolor={theme.palette.background.default}
                sx={{
                    position: 'absolute',
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: `1px solid${theme.palette.primary.main}`,
                    padding: '40px',
                    borderRadius: '16px',
                }}
            >
                <Typography color={theme.palette.primary.main}>Ola</Typography>
            </Box>
        </React.Fragment>
        /*<Container>
            <Box>
               {/!* <AppBar
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
                    <Toolbar sx={{flexWrap: 'wrap'}}>
                        <Box sx={{width: '100%'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="icon position tabs example"
                                >
                                    <Tab icon={<PersonAddIcon/>} iconPosition="start" label="Encontro"/>
                                    <Tab icon={<HomeIcon/>} iconPosition="start" label="Menu"/>
                                    <Tab icon={<GroupIcon/>} iconPosition="start" label="Contatos"/>
                                </Tabs>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>


                <Box>
                    <CustomTabPanel value={value} index={0}>
                        Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>*!/}

            </Box>
        </Container>*/
    );
}

export default AppBarHome;
