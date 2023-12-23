import React, {useState} from 'react';
import {
    Typography,
    Button,
    Grid, Card, CardContent, Avatar,
} from '@mui/material';
import {Interest} from "../../../model/interest";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import {grey} from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {linkInterestToUser} from "../../../api/user_requests/link_interest";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {showSnackbar} from "../../../redux/slices/app";
import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {PersonRemove, Remove} from "@mui/icons-material";

interface InterestCardProps {
    interest: Interest;
}

const InterestCard: React.FC<InterestCardProps> = ({interest}) => {
    const theme = useTheme();
    const [isExpanded, setExpanded] = useState(false);
    const {token} = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
    };

    const handleAddInterest = async () => {
        await linkInterestToUser(token, interest.id);
        // @ts-ignore
        dispatch(showSnackbar({severity: 'success', message: 'Interesse adicionado!'}));
    };

    const handleRemoveInterest = async () => {
        await unlinkInterestToUser(token, interest.id);
        // @ts-ignore
        dispatch(showSnackbar({severity: 'success', message: 'Interesse removido!'}));
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{minHeight: isExpanded ? '250px' : '200px'}}
            >
                <CardHeader
                    title={interest.name}
                    subheader={interest.company?.name}
                    titleTypographyProps={{align: 'center'}}
                    subheaderTypographyProps={{align: 'center'}}
                    /*action={interest.title === 'Premium' ? <StarIcon /> : null}*/
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        backgroundColor: (theme) => grey[900],
                    }}
                />
                {isExpanded && (
                    <CardContent>
                        <img
                            src={interest.formattedImages[0]}
                            alt={interest.name}
                            //sx={{height: 128, width: 128}}
                        />
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
                        <IconButton
                            sx={{color: `theme.palette.primary.main`}}
                            onClick={() => {
                                interest.added ? handleRemoveInterest() : handleAddInterest();
                                interest.added = !interest.added;
                            }}
                            title={interest.added ? "Remover Interesse" : "Adicionar Interesse"}
                        >
                            {interest.added ? <Remove/> : <AddIcon/>}
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
