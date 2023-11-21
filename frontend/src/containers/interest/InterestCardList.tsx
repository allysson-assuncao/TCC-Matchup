import React, {useState} from 'react';
import {
    Box,
    CssBaseline,
    Typography,
    Button,
    Grid,
} from '@mui/material';
import AppBarProfile from "../containers/appbars/AppBarProfile";
import {getUser} from "./Home";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import StarIcon from "@mui/icons-material/StarBorder";
import {grey} from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import InterestFilters from "../containers/interest/InterestFilters";
import {Interest} from "../model/interest";

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

const InterestManagement: React.FC = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);

    const [interest, setInterests] = useState<Interest[]>([]);

    return (
        <Grid>
            <AppBarProfile editable={true} blocked={false} username={getUser().username}
                           idProfile={getUser().id}></AppBarProfile>
            <CssBaseline/>
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container>
                    <Grid item md={4}>
                        <InterestFilters></InterestFilters>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container spacing={5} alignItems="flex-end">
                            {tiers.map((tier) => (
                                <Grid
                                    item
                                    key={tier.title}
                                    xs={12}
                                    sm={tier.title === 'Intermediário' ? 12 : 6}
                                    md={4}
                                >
                                    <Card>
                                        <CardHeader
                                            title={tier.title}
                                            subheader={tier.subheader}
                                            titleTypographyProps={{align: 'center'}}
                                            action={tier.title === 'Premium' ? <StarIcon/> : null}
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
                    </Grid>
                </Grid>
            </Box>
            <Copyright/>
        </Grid>
    );
};

export default InterestManagement;
