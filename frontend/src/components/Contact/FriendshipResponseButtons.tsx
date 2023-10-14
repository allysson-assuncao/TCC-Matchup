import React, {useState} from "react";
import {User} from "../../model/user";
import {IconButton, Button, Grid, Typography} from "@mui/material";
import ProfilePicture from "../ProfilePicture";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {CheckCircle, Clear} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";
import {ROUTE_PROFILE} from "../../App";
import {Notification} from "../../model/notification";
import {friendshipSolicitationResponse} from "../../api/user_requests/friendship";
import {getUser} from "../../pages/home/Home";

interface NotificationProps {
    friendshipId: bigint,
    removeNotificationById?: (notificationId: bigint) => void;
    notificationId?: bigint;
    verifyFriendship?: (user: User) => void;
}

const FriendshipResponseButtons: React.FC<NotificationProps> = ({verifyFriendship, notificationId, removeNotificationById, friendshipId}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();

    console.log(friendshipId);

    return (
        <Grid alignItems={'center'} bgcolor={theme.palette.background.default} container>
            <Grid item>
                <IconButton onClick={async () => {
                    let response = await friendshipSolicitationResponse(friendshipId, true);
                    if(removeNotificationById && response && notificationId) removeNotificationById(notificationId);
                    if (verifyFriendship) verifyFriendship(getUser());
                }}>
                    <CheckCircle color="primary"></CheckCircle>
                </IconButton>
                <IconButton onClick={async () => {
                    let response = await friendshipSolicitationResponse(friendshipId, false);
                    if(removeNotificationById && response && notificationId) removeNotificationById(notificationId);
                    if (verifyFriendship) verifyFriendship(getUser());
                }}>
                    <CloseIcon color="disabled"></CloseIcon>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default FriendshipResponseButtons;
