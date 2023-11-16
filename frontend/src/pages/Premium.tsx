import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import {grey} from "@mui/material/colors";

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
];

const Premium = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);

    return (
        <Box sx={{backgroundColor:`theme.palette.background.defeult`}}>
            <CssBaseline/>
            <Container disableGutters maxWidth="sm" component="main" sx={{pt: 8, pb: 6}}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color={theme.palette.primary.main}
                    gutterBottom
                >
                    Planos
                </Typography>
                <Typography variant="h5" align="center" color={theme.palette.secondary.main} component="p">
                    Garante a melhor experiência de uso da aplicação com um plano que atenda todas
                    as suas necessidades! Aqui estão as opções atuais:
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
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
            <Copyright/>
        </Box>
    );
}

export default Premium;
