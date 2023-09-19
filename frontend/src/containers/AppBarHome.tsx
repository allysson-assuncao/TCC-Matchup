import logo from '../img/logo-matchup2.png'
import * as React from "react";
import {
    AppBar,
    Toolbar,
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
    Menu,
    Button,
    Tooltip,
    useScrollTrigger
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import theme from '../theme'

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

/*const AppBarHome = () => {
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
                bgcolor: theme.palette.background.default,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <AppBar position="fixed"
                            sx={{
                                border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                                borderRadius: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minWidth: 'fit-content',
                            }}
                    >
                        <Toolbar sx={{display: 'flex', justifyContent: 'center'}}>
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
                </Box>


            </Box>
        </React.Fragment>
    );
}*/

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Perfil', 'Configurações', 'Contato', 'Sair'];

const AppBarHome = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
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

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box bgcolor={theme.palette.background.default}>
            <Container component="main">
                <CssBaseline/>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <img src={logo + ''}/>
                            </Typography>
                            {/*<Toolbar sx={{display: 'flex', justifyContent: 'center'}}>
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
                        </Toolbar>*/}

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
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
                                        </MenuItem>
                                    ))}
                                </Menu>


                            </Box>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'flex', md: 'none'},
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <img src={logo + ''}/>
                            </Typography>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                <Toolbar sx={{display: 'flex', justifyContent: 'center'}}>
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
                                {/*{pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}*/}
                            </Box>

                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Abrir opções">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt="Menu" src="/static/images/avatar/2.jpg"/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
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
            </Container>
        </Box>
    )

}

export default AppBarHome;
