import React from 'react';
import {
    Box,
    Grid, Stack, Typography,
} from '@mui/material';
import InterestCard from "../../components/our/Interest/InterestCard";
import {InterestRequest} from "../../model/interest_filtered_request";
import {SimpleBarStyle} from "../../components/Scrollbar";
import ChatElement from "../../components/ChatElement";

interface InterestCardListProps {
    interests: InterestRequest | undefined;
}

const InterestCardList: React.FC<InterestCardListProps> = ({interests}) => {
    return (
        <Box sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'auto'
        }}>
            <Stack sx={{ maxHeight: "85vh"}}>
                <Grid container spacing={5} p={0}
                      sx={{padding: '0px', margin: "0px", width: 'auto', display: 'flex', justifyContent:"space-between", flexWrap: 'wrap', alignItems: 'flex-start'}}>
                    <>
                        {interests && interests.content && interests.content.map((interest) => (
                            <InterestCard key={Number(interest.id)} elementNumber={interests.numberOfElements} interest={interest}/>
                        ))}
                    </>
                </Grid>
            </Stack>
        </Box>
    );
};

export default InterestCardList;
