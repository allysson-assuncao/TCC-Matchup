import React from 'react';
import {
    Box,
    Grid,
} from '@mui/material';
import InterestCard from "../../components/Interest/InterestCard";
import {Interest} from "../../model/interest";
import {InterestRequest} from "../../model/interest_filtered_request";

interface InterestCardListProps {
    interests: InterestRequest | undefined;
}

const InterestCardList: React.FC<InterestCardListProps> = ({ interests }) => {
    return (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={5} alignItems="flex-end">
                {interests && interests.content && interests.content.map((interest) => (
                    <InterestCard key={Number(interest.id)} interest={interest} />
                ))}
            </Grid>
        </Box>
    );
};

export default InterestCardList;
