import React, {useState} from 'react';
import {
    Box,
    CssBaseline,
    Typography,
    Grid,
} from '@mui/material';
/*import AppBarProfile from "../containers/appbars/AppBarProfile";*/
import Link from "@mui/material/Link";
import InterestFilters from "../../containers/interest/InterestFilters";
import InterestCardList from "../../containers/interest/InterestCardList";
import {InterestRequest} from "../../model/interest_filtered_request";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";

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
    const theme = useTheme();
    const [filteredInterests, setFilteredInterests] = useState<InterestRequest>();
    const {usernamePathVariable} = useParams();

    return (
        <Grid>

            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container justifyContent={'center'}>
                    <Grid item md={10} sm={11} xs={12}>
                        <Grid container spacing={5}>
                            <Grid item md={4}>
                                <InterestFilters
                                    filteredInterests={filteredInterests}
                                    setFilteredInterests={setFilteredInterests}
                                    username={usernamePathVariable}
                                />
                            </Grid>
                            <Grid item md={8}>
                                <InterestCardList interests={filteredInterests}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Copyright/>
        </Grid>
    );
};

export default InterestManagement;
