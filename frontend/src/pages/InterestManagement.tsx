import React, {useState} from 'react';
import {
    Box,
    CssBaseline,
    Typography,
    Grid,
} from '@mui/material';
import AppBarProfile from "../containers/appbars/AppBarProfile";
import {getUser} from "./Home";
import Link from "@mui/material/Link";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import InterestFilters from "../containers/interest/InterestFilters";
import {Interest} from "../model/interest";
import InterestCardList from "../containers/interest/InterestCardList";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{mt: '50px', mb: '50px'}}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Matchup
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const InterestManagement: React.FC = () => {
    const {theme: mode} = useCustomTheme();
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
                        <InterestCardList interests={interest} />
                    </Grid>
                </Grid>
            </Box>
            <Copyright/>
        </Grid>
    );
};

export default InterestManagement;
