import {
    Box,
    Container,
    CssBaseline, Grow,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import Grid from "@mui/material/Grid";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const Features = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            //const isBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5000;
            if (window.scrollY > 200 || window.scrollY < 1200) {
                setScrolled(true);
            }
            if (window.scrollY >= 1200 || window.scrollY <= 200) {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <Container component="main" maxWidth={false}>
            <CssBaseline/>
            <Box
                component="section"
                sx={{display: 'flex', bgcolor: 'background', overflow: 'hidden'}}
            >
                <Container
                    sx={{
                        mt: 10,
                        mb: 15,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" component="h2" color={theme.palette.secondary.main} sx={{mb: 10}}>
                        Funcionalidades
                    </Typography>
                    <Grid>
                        <Grid container spacing={5} sx={{marginBottom: '100px'}}>
                            {/*<Grow in={scrolled}>*/}
                                <Grid item xs={12} md={3}>
                                    <Box sx={item}>
                                        <SportsEsportsOutlinedIcon color="primary"
                                                                   sx={{width: '80px', height: '80px', marginTop: '15px', marginBottom: '15px'}}/>
                                        <Typography color={theme.palette.primary.main} variant="h5" align="center">
                                            Selecione seus jogos favoritos e converse sobre eles com seus amigos!
                                        </Typography>
                                    </Box>
                                </Grid>
                            {/*</Grow>
                            <Grow in={scrolled}
                                  style={{transformOrigin: '0 0 0'}}
                                  {...(scrolled ? {timeout: 1000} : {})}
                            >*/}
                                <Grid item xs={12} md={3}>
                                    <Box sx={item}>
                                        <GroupAddOutlinedIcon color="primary"
                                                              sx={{width: '80px', height: '80px', marginTop: '15px', marginBottom: '15px'}}/>
                                        <Typography color={theme.palette.primary.main} variant="h5" align="center">
                                            Encontre pessoas com gostos em comum para conversar pela plataforma!
                                        </Typography>
                                    </Box>
                                </Grid>
                            {/*</Grow>
                            <Grow in={scrolled}
                                  style={{transformOrigin: '0 0 0'}}
                                  {...(scrolled ? {timeout: 2000} : {})}
                            >*/}
                                <Grid item xs={12} md={3}>
                                    <Box sx={item}>
                                        <SportsEsportsOutlinedIcon color="primary"
                                                                   sx={{width: '80px', height: '80px', marginTop: '15px', marginBottom: '15px'}}/>
                                        <Typography color={theme.palette.primary.main} variant="h5" align="center">
                                            Descubra novos jogos recomendados com base nos seus interesses!
                                        </Typography>
                                    </Box>
                                </Grid>
                            {/*</Grow>*/}
                            {/*<Grow in={scrolled}
                                  style={{transformOrigin: '0 0 0'}}
                                  {...(scrolled ? {timeout: 3000} : {})}
                            >*/}
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <SportsEsportsOutlinedIcon color="primary"
                                                               sx={{width: '80px', height: '80px', marginTop: '15px', marginBottom: '15px'}}/>
                                    <Typography color={theme.palette.primary.main} variant="h5" align="center">
                                        Descubra novos jogos recomendados com base nos seus interesses!
                                    </Typography>
                                </Box>
                            </Grid>
                            {/*</Grow>*/}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Container>
    );
}

export default Features;
