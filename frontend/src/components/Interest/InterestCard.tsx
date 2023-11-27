import React, {useState} from 'react';
import {
    Typography,
    Button,
    Grid, Card, CardContent,
} from '@mui/material';
import {Interest} from "../../model/interest";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import {grey} from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {linkInterestToUser} from "../../api/user_requests/link_interest";
interface InterestCardProps {
    interest: Interest;
}

const InterestCard: React.FC<InterestCardProps> = ({ interest }) => {
    const [isExpanded, setExpanded] = useState(false);

    const handleMouseEnter = () => {
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
    };

    const handleAddInterest = async () => {
        // @ts-ignore
        await linkInterestToUser(getUser().id, interest.id);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{ minHeight: isExpanded ? '250px' : '200px' }}
            >
                <CardHeader
                    title={interest.name}
                    subheader={interest.company?.name}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    /*action={interest.title === 'Premium' ? <StarIcon /> : null}*/
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        backgroundColor: (theme) => grey[900],
                    }}
                />
                {isExpanded && (
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Description: {interest.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lowest Price: ${interest.lowestPrice}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Highest Price: ${interest.highestPrice}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Age Rating: {interest.ageRating?.name}
                        </Typography>
                        <IconButton sx={{color: `theme.palette.primary.main`}} onClick={() => handleAddInterest()}>
                            <AddIcon></AddIcon>
                        </IconButton>
                    </CardContent>
                )}
                <CardActions>
                    <Button fullWidth variant={'contained'}>
                        More Info
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default InterestCard;
