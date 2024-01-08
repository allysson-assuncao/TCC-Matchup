import React, {useEffect, useRef, useState} from 'react';
import {
    Typography,
    Button,
    Grid, Card, CardContent, Avatar, Stack, Chip, Popper, Box, Fade,
} from '@mui/material';
import {Interest} from "../../../model/interest";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import {grey} from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import {linkInterestToUser, unlinkInterestToUser} from "../../../api/user_requests/link_interest";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {showSnackbar} from "../../../redux/slices/app";
import {PersonRemove, Remove} from "@mui/icons-material";
import ImageUploader from "../fields/ImageUploader";
import {updateInterestImagesById} from "../../../api/interest_requests/updateInterestImage";
import {ClickAwayListener} from "@mui/base";

interface InterestCardProps {
    interest: Interest;
}

const InterestCard: React.FC<InterestCardProps> = ({interest}) => {
    const theme = useTheme();
    const {user} = useSelector((state: any) => state.app);
    const [isExpanded, setExpanded] = useState(false);
    const {token} = useSelector((state: any) => state.auth);
    /*const [open, setOpen] = React.useState(false);*/
    const dispatch = useDispatch();

    const [newImages, setNewImages] = useState<File[]>([]);

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

    const handleSave = () => {
        updateInterestImagesById(newImages, interest.id, token);
    };

    const [open, setOpen] = useState(false);
    const [popperPosition, setPopperPosition] = useState({ top: 0, left: 0 });
    const anchorEl = useRef<HTMLButtonElement | null>(null);
    const popperRef = React.createRef<HTMLDivElement>();

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const updatePopperPosition = () => {
        if (anchorEl.current && popperRef.current) {
            const { top, left } = anchorEl.current.getBoundingClientRect();
            setPopperPosition({ top: top + window.scrollY, left });
        }
    };

    useEffect(() => {
        if (open) {
            updatePopperPosition();
            window.addEventListener('scroll', updatePopperPosition);
        } else {
            window.removeEventListener('scroll', updatePopperPosition);
        }

        return () => {
            window.removeEventListener('scroll', updatePopperPosition);
        };
    }, [open]);

    const canBeOpen = open && Boolean(anchorEl.current);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    minHeight: isExpanded ? 'auto' : '200px',
                    transition: 'min-height 0.3s ease-in-out',
                }}
            >
                <ImageUploader
                    setImages={setNewImages}
                    handleSave={handleSave}
                    calledByInterestCard
                    interestImageList={interest.formattedImages}
                    userAccess={user.access}/>
                <CardHeader
                    title={interest.name}
                    subheader={interest.company?.name}
                    titleTypographyProps={{align: 'center'}}
                    subheaderTypographyProps={{align: 'center'}}

                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        backgroundColor: (theme) => grey[900],
                        mb: "5px"
                    }}
                />
                <CardActions>
                    <Button fullWidth variant={'contained'} ref={anchorEl} aria-describedby={id} type="button" onClick={handleClick}>
                        Mais Informações
                    </Button>
                </CardActions>
            </Card>
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={() => handleClick()}
            >
            <Popper
                placeholder={""}
                id={id}
                open={open}
                anchorEl={anchorEl.current}
                placement="auto"
                disablePortal={false}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Card
                            sx={{
                                transition: 'min-height 0.3s ease-in-out',
                            }}
                        >
                            <ImageUploader
                                setImages={setNewImages}
                                handleSave={handleSave}
                                calledByInterestCard
                                interestImageList={interest.formattedImages}
                                userAccess={user.access}/>
                            <CardHeader
                                title={interest.name}
                                subheader={interest.company?.name}
                                titleTypographyProps={{align: 'center'}}
                                subheaderTypographyProps={{align: 'center'}}
                                sx={{
                                    color: (theme) => theme.palette.primary.main,
                                    backgroundColor: (theme) => grey[900],
                                    mb: "5px"
                                }}
                            />
                            <CardActions sx={{paddingY: "5px"}}>
                                <Button
                                    onClick={() => {
                                        interest.added ? handleRemoveInterest() : handleAddInterest();
                                        interest.added = !interest.added;
                                    }}
                                    fullWidth
                                    title={interest.added ? "Remover Interesse" : "Adicionar Interesse"}
                                    startIcon={interest.added ? <Remove/> : <AddIcon/>}
                                    variant="outlined"
                                >
                                    {interest.added ? "Remover" : "Adicionar"}
                                </Button>
                            </CardActions>
                            <CardContent sx={{padding: "0px", marginX: "15px"}}>
                                <Typography variant="body2" color="text.secondary">
                                    Descrição: {interest.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Preço: R${interest.lowestPrice} ~ R${interest.highestPrice}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Idade: {interest.ageRating?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Gêneros:
                                </Typography>
                                <Stack style={{display: 'flex', overflowX: 'auto'}}>
                                    {interest && interest.genres.length != 0
                                        && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                            {interest.genres.map((genre, index) => (
                                                <Chip key={index} label={genre.name + ""} style={{margin: 0}}
                                                      sx={{backgroundColor: "#7635dc"}}/>
                                            ))}
                                        </Stack>)
                                    }
                                </Stack>
                                <Typography variant="body2" color="text.secondary">
                                    Subgêneros:
                                </Typography>
                                {interest && interest.genres.length != 0
                                    && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                        {interest.subGenres.map((subGenre, index) => (
                                            <Chip key={index} label={subGenre.name + ""} style={{margin: 4}}
                                                  sx={{backgroundColor: "#0162c4"}}/>
                                        ))}
                                    </Stack>)
                                }
                                <Typography variant="body2" color="text.secondary">
                                    Plataformas:
                                </Typography>
                                {interest && interest.genres.length != 0
                                    && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                        {interest.platforms.map((platform, index) => (
                                            <Chip key={index} label={platform.name + ""} style={{margin: 4}}
                                                  sx={{backgroundColor: "#fda92d"}}/>
                                        ))}
                                    </Stack>)
                                }
                                <Typography variant="body2" color="text.secondary">
                                    Dublado:
                                </Typography>
                                {interest && interest.genres.length != 0
                                    && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                        {interest.dubbingLanguages.map((dubbingLanguage, index) => (
                                            <Chip key={index} label={dubbingLanguage.id + ""} style={{margin: 4}}
                                                  sx={{backgroundColor: "#1ccaff"}}/>
                                        ))}
                                    </Stack>)
                                }
                                <Typography variant="body2" color="text.secondary">
                                    Legendado:
                                </Typography>
                                {interest && interest.genres.length != 0
                                    && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                        {interest.subtitleLanguages.map((subtitleLanguage, index) => (
                                            <Chip key={index} label={subtitleLanguage.id + ""} style={{margin: 4}}
                                                  sx={{backgroundColor: "#ff3030"}}/>
                                        ))}
                                    </Stack>)
                                }
                            </CardContent>
                        </Card>
                    </Fade>
                )}
            </Popper>
            </ClickAwayListener>
        </Grid>
    );
};

export default InterestCard;
