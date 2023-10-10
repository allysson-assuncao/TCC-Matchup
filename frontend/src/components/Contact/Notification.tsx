import React from "react";
import { User } from "../../model/user";
import { Button, Grid } from "@mui/material";
import ProfilePicture from "../ProfilePicture";
import {getUser} from "../../pages/home/Home";

export const NOTIFICATION_TYPES = {
    DEFAULT: 1,
    FRIENDSHIP_SOLICITATION: 2
}

interface NotificationProps {
    text?: string;
    type: number;
    sender?: User;
    date: Date;
}

const Notification: React.FC<NotificationProps> = ({ text, type, sender, date }) => {
    return (
        <Grid container>
            <Grid item>
                {type === NOTIFICATION_TYPES.FRIENDSHIP_SOLICITATION && sender &&
                    <ProfilePicture id={sender.id} small={true}/>
                }
            </Grid>
        </Grid>
    );
}

export default Notification;
