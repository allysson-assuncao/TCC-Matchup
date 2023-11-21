import React from 'react';
import {
    Box,
    Grid,
} from '@mui/material';
import InterestCard from "../../components/Interest/InterestCard";
import {Interest} from "../../model/interest";

interface InterestCardListProps {
    interests: Interest[];
}

const exampleInterests: Interest[] = [
    {
        id: BigInt(1),
        name: 'Example Game 1',
        description: 'This is an example game.',
        company: { id: BigInt(1), name: 'Example Company' },
        lowestPrice: 20.0,
        highestPrice: 49.99,
        dubbingLanguages: [{ id: BigInt(1), name: 'English' }],
        subtitleLanguages: [{ id: BigInt(2), name: 'Spanish' }],
        genres: [{ id: BigInt(1), name: 'Action' }],
        subGenres: [{ id: BigInt(2), name: 'Adventure' }],
        platforms: [{ id: BigInt(1), name: 'PC' }],
        ageRating: { id: BigInt(1), name: 'Teen' },
    },
    // Add more examples as needed
];

const InterestCardList: React.FC<InterestCardListProps> = ({ interests }) => {
    return (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={5} alignItems="flex-end">
                {exampleInterests.map((interest) => (
                    <InterestCard key={interest.id} interest={interest} />
                ))}
            </Grid>
        </Box>
    );
};

export default InterestCardList;
