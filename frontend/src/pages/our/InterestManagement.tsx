import React, {useState} from 'react';
import {
    Box,
    CssBaseline,
    Typography,
    Grid, Stack,
} from '@mui/material';
/*import AppBarProfile from "../containers/appbars/AppBarProfile";*/
import { MapOrEntries, useMap } from 'usehooks-ts'
import Link from "@mui/material/Link";
import InterestFilters from "../../containers/interest/InterestFilters";
import InterestCardList from "../../containers/interest/InterestCardList";
import {InterestRequest} from "../../model/interest_filtered_request";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {Pagination} from "@mui/lab";

const InterestManagement: React.FC = () => {
    const theme = useTheme();
    const [filteredInterests, setFilteredInterests] = useState<InterestRequest>();
    const {usernamePathVariable} = useParams();
    const [page, setPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(1);
    //const [loadedPages, addLoadedPage] = React.useMap
    const [map, mapActions] = useMap<number, InterestRequest>([]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
    }

    return (
        <Grid>
            <CssBaseline/>
            <Box maxHeight={"800px"} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container justifyContent={'center'}>
                    <Grid item md={10} sm={11} xs={12}>
                        <Grid container spacing={5}>
                            <Grid item md={4}>
                                <InterestFilters
                                    filteredInterests={filteredInterests}
                                    setFilteredInterests={setFilteredInterests}
                                    username={usernamePathVariable}
                                    page={page}
                                    setPage={setPage}
                                    setTotalPages={setTotalPages}
                                    map={map}
                                    mapActions={mapActions}
                                />
                            </Grid>
                            <Grid item md={8}>
                                <InterestCardList interests={filteredInterests}/>
                                <Stack justifyContent={"center"} spacing={2}>
                                    <Pagination count={totalPages} page={page+1} onChange={handleChange}/>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default InterestManagement;
