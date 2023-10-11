import React from "react";
import {User} from "../../model/user";
import {IconButton, Button, Grid, Typography} from "@mui/material";
import ProfilePicture from "../ProfilePicture";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {CheckCircle, Clear} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";
import {ROUTE_PROFILE} from "../../App";

export const NOTIFICATION_TYPES = {
    DEFAULT: 1,
    FRIENDSHIP_SOLICITATION: 2,
    SOLICITATION_ACCEPTED: 3,
    SOLICITATION_DENIED: 4
}

export const SOLICITATION_TEXT = {
    PENDING: ` te enviou um pedido de amizade`,
    ACCEPTED: ' aceitou seu pedido de amizade',
    REFUSED: 'negou seu pedido de amizade'
}

interface NotificationProps {
    text?: string;
    type: number;
    sender?: User;
    date: Date;
}

const Notification: React.FC<NotificationProps> = ({text, type, sender, date}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();
    /*switch (type){
        case NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION:
            text = SOLICITATION_TEXT.PENDING;
        case 3:
            text = SOLICITATION_TEXT.ACCEPTED;
        case 4:
            text = SOLICITATION_TEXT.REFUSED;
    }*/

    return (
        <Grid bgcolor={theme.palette.secondary.main} container>
            <Grid item>
                {type === NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION && sender &&
                    <ProfilePicture id={sender.id} small={true}/>
                }
            </Grid>
            <Grid item>
                {type === NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION && !text && sender &&
                    <Typography
                        color={theme.palette.primary.main}>
                        <Typography
                            onClick={() => {history(`${ROUTE_PROFILE}/${sender?.username}`)}}
                            style={{ cursor: 'pointer' }}>
                            {sender.username}
                        </Typography>

                            {text}</Typography>
                }
                {type === NOTIFICATION_TYPES.SOLICITATION_ACCEPTED && !text && sender &&
                    <Typography
                        color={theme.palette.primary.main}>
                        <Typography
                            onClick={() => {history(`${ROUTE_PROFILE}/${sender?.username}`)}}
                            style={{ cursor: 'pointer' }}>
                            {sender.username}
                        </Typography>
                        {SOLICITATION_TEXT.ACCEPTED}</Typography>
                }
                {type === NOTIFICATION_TYPES.SOLICITATION_DENIED && !text && sender &&
                    <Typography
                        color={theme.palette.primary.main}>{sender.username + SOLICITATION_TEXT.ACCEPTED}</Typography>
                }
            </Grid>
            <Grid item>
                {type === NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION && !text && sender &&
                    <Grid item>
                        <IconButton>
                            <CheckCircle color="primary"></CheckCircle>
                        </IconButton>
                        <IconButton>
                            <CloseIcon color="error"></CloseIcon>
                        </IconButton>
                    </Grid>
                }
                {type !== NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION && !text  &&
                    <IconButton>
                        <Clear color="error"></Clear>
                    </IconButton>
                }
            </Grid>
            <div>
                {/*{itens.map((item, index) => (
                    <ItemComponent key={index} item={item} />
                ))}*/}
            </div>
        </Grid>
    );
}

export default Notification;
