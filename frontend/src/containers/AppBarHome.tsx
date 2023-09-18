import logo from '../img/logo-matchup2.png'
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Grid,
    MenuItem,
    Stack,
    Tab,
    Tabs,
    Typography,
    useScrollTrigger
} from "@mui/material";
import theme from "../theme";
import {useNavigate} from "react-router-dom";
import {ROUTE_SIGN_IN, ROUTE_SIGN_UP} from "../App";
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Login} from "@mui/icons-material";
import Profile from "../pages/profile/Profile";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AppBarHome = () => {
    const history = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        dir?: string;
        index: number;
        value: number;
    }

    return (
        <React.Fragment>
            <Box sx={{
                bgcolor: 'black',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <AppBar position="fixed"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minWidth: 'fit-content',
                            }}
                    >
                        <Toolbar sx={{display: 'flex', justifyContent: 'center', border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                            bgcolor: 'background.paper',
                            borderRadius: '40px'}}>
                            <Box>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <Tab icon={<PersonAddIcon/>} iconPosition="start" label="Encontro"/>
                                    <Tab icon={<HomeIcon/>} iconPosition="start" label="Menu"/>
                                    <Tab icon={<GroupIcon/>} iconPosition="start" label="Contatos"/>
                                </Tabs>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <CustomTabPanel value={value} index={0}>
                        Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                    <Typography>Olá Mundo</Typography>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default AppBarHome;
