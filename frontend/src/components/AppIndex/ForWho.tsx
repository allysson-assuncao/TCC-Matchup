import * as React from 'react';
import {Theme} from '@mui/material/styles';
import {SxProps} from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Grow, Typography} from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import theme from "../../theme";

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const ForWho = () => {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            //const isBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5000;
            if (window.scrollY > 800 || window.scrollY < 1600) {
                setScrolled(true);
            }
            if (window.scrollY >= 1600 || window.scrollY <= 800) {
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
            sx={{display: 'flex', overflow: 'hidden', bgcolor: 'secondary.dark'}}
        >
            <Container sx={{mt: 20, mb: 25, display: 'flex', position: 'relative'}}>
                <Grid container spacing={5}>
                    <Grow in={scrolled}
                          style={{transformOrigin: '0 0 0'}}
                          {...(scrolled ? {timeout: 1000} : {})}
                    >
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <QuestionAnswerIcon
                                                    sx={{width: '80px', height: '80px', color: 'white', marginTop: '15px', marginBottom: '15px'}}/>
                                <Typography color='white' variant="h5" align="center">
                                    Para pessoas que adoram conversar sobre jogos
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
                                <GroupsIcon color="primary"
                                            sx={{width: '80px', height: '80px', color: 'white', marginTop: '15px', marginBottom: '15px'}}/>
                                <Typography color='white' variant="h5" align="center">
                                    Para gamers solitários em busca de mais companheiros de jogatina
                                </Typography>
                            </Box>
                        </Grid>
                    </Grow>
                    <Grow in={scrolled}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <SchoolIcon
                                            sx={{width: '80px', height: '80px', marginTop: '15px', color: 'white', marginBottom: '15px'}}/>
                                <Typography color='white' variant="h5" align="center">
                                    Para aqueles que desejam expandir o seu repertório gamer
                                </Typography>
                            </Box>
                        </Grid>
                    </Grow>
                </Grid>
            </Container>
        </Box>
    );
}

export default ForWho;