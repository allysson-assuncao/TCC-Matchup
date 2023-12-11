import {
    Box,
    Container,
    CssBaseline, Grow,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCustomTheme} from "../contexts/CustomThemeContext";
import getTheme from "../theme";
import Grid from "@mui/material/Grid";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import StarIcon from "@mui/icons-material/StarBorder";
import {grey} from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{mt:'50px', mb:'50px'}}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Matchup
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const tiers = [
    {
        title: 'Gratuito',
        price: '0',
        description: [
            '10 matches por dia',
            'Limite de mensagens',
            'Limite de Contatos',
            'Anúncios',
        ],
        buttonText: 'Cadastre-se de graça!',
        buttonVariant: 'outlined',
    },
    {
        title: 'Premium',
        subheader: 'Mais popular',
        price: '7,90',
        description: [
            'Matches ilimitados',
            'Mensagens ilimitados',
            'Contatos ilimitados',
            'Sem anúncios',
        ],
        buttonText: 'Começe já!',
        buttonVariant: 'contained',
    },
    {
        title: 'Intermediário',
        price: '2,90',
        description: [
            '30 matches por dia',
            'Maior limite de mensagens',
            'Maior limite de Contatos',
            'Menos anúncios',
        ],
        buttonText: 'Começe já!',
        buttonVariant: 'outlined',
    },
    {
        title: 'Intermediário',
        price: '2,90',
        description: [
            '30 matches por dia',
            'Maior limite de mensagens',
            'Maior limite de Contatos',
            'Menos anúncios',
        ],
        buttonText: 'Começe já!',
        buttonVariant: 'outlined',
    },
];

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
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
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
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            <Grid
                                item
                                key={tier.title}
                                xs={12}
                                sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={3}
                            >
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{align: 'center'}}
                                        action={tier.title === 'Pro' ? <StarIcon/> : null}
                                        subheaderTypographyProps={{
                                            color: (theme) => theme.palette.secondary.dark,
                                            align: 'center',
                                        }}
                                        sx={{
                                            color: (theme) => theme.palette.primary.main,
                                            backgroundColor: (theme) => grey[900],
                                        }}
                                    />
                                    <CardContent sx={{backgroundColor: (theme) => theme.palette.text.secondary}}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'baseline',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color={theme.palette.background.paper}>
                                                ${tier.price}
                                            </Typography>
                                            <Typography variant="h6" color={theme.palette.background.paper}>
                                                /mês
                                            </Typography>
                                        </Box>
                                        <ul>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="center"
                                                    key={line}
                                                    color={theme.palette.background.paper}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardActions sx={{backgroundColor: (theme) => theme.palette.text.primary}}>
                                        <Button
                                            fullWidth
                                            variant={'contained'}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Copyright/>
        </Container>
    );
}

export default Features;
