import React from "react";
import { User } from "../../model/user";
import {Button, Grid, Typography} from "@mui/material";
import ProfilePicture from "../ProfilePicture";
import {getUser} from "../../pages/home/Home";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";

export const NOTIFICATION_TYPES = {
    DEFAULT: 1,
    FRIENDSHIP_SOLICITATION: 2
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

const Notification: React.FC<NotificationProps> = ({ text, type, sender, date }) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    return (
        <Grid bgcolor={theme.palette.secondary.main} container>
            <Grid item>
                {type === NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION && sender &&
                    <ProfilePicture id={sender.id} small={true}/>
                }
            </Grid>
            <Grid item>
                {type === NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION && !text && sender && //accepted?
                    <Typography color={theme.palette.primary.main}>${sender.username + SOLICITATION_TEXT.PENDING /*iterator*/}</Typography>
                }
            </Grid>
        </Grid>
    );
}

export default Notification;
