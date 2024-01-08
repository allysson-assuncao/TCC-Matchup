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
        <Box sx={{marginTop: 5, display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'center', overflowY: 'auto'}}>
            <Stack p={3} sx={{maxHeight: "85vh"}}>
                <Grid container spacing={5}>
                    {interests && interests.content && interests.content.map((interest) => (
                        <InterestCard key={Number(interest.id)} interest={interest}/>
                    ))}
                </Grid>
            </Stack>
        </Box>
    );
};

export default InterestCardList;
