import * as React from 'react';
import {Theme} from '@mui/material/styles';
import {SxProps} from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Button, Grow, Typography, useScrollTrigger} from "@mui/material";
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import theme from "../../theme";

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'secondary.main',
    fontWeight: 'medium',
};

const image = {
    height: 55,
    my: 4,
};

const WhatIsMatchup = () => {

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
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7,
                    }}
                />
                <Typography variant="h4" component="h2" color={theme.palette.secondary.main} sx={{mb: 14}}>
                    O que é o Matchup?
                </Typography>
                <div>
                    <Grid container spacing={5} sx={{marginBottom: '100px'}}>
                        <Grow in={scrolled}>
                            <Grid item xs={12} md={4}>
                                <Box sx={item}>
                                    <Box sx={number}>1.</Box>
                                    <SportsEsportsOutlinedIcon color="primary"
                                                               sx={{width: '80px', height: '80px', marginTop: '15px', marginBottom: '15px'}}/>
                                    <Typography color={theme.palette.primary.main} variant="h5" align="center">
                                        Selecione seus jogos favoritos e converse sobre eles com seus amigos!
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grow>
                        <Grow in={scrolled}
                              style={{transformOrigin: '0 0 0'}}
                              {...(scrolled ? {timeout: 1000} : {})}
                        >
                            <Grid item xs={12} md={4}>
                                <Box sx={item}>
                                    <Box sx={number}>2.</Box>

                                    <GroupAddOutlinedIcon color="primary"
                                                          sx={{width: '80px', height: '80px', marginTop: '15px', marginBottom: '15px'}}/>
                                    <Typography color={theme.palette.primary.main} variant="h5" align="center">
                                        Encontre pessoas com gostos em comum para conversar pela plataforma!
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grow>
                        <Grow in={scrolled}
                              style={{transformOrigin: '0 0 0'}}
                              {...(scrolled ? {timeout: 2000} : {})}
                        >
                            <Grid item xs={12} md={4}>
                                <Box sx={item}>
                                    <Box sx={number}>3.</Box>

                                    <SportsEsportsOutlinedIcon color="primary"
                                                               sx={{width: '80px', height: '80px', marginTop: '15px', marginBottom: '15px'}}/>
                                    <Typography color={theme.palette.primary.main} variant="h5" align="center">
                                        Descubra novos jogos recomendados com base nos seus interesses!
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grow>
                    </Grid>
                </div>
            </Container>
        </Box>
    );
}

export default WhatIsMatchup;
