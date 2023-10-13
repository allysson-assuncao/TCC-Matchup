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

interface NotificationProps {
    friendshipId: bigint
}

const FriendshipResponseButtons: React.FC<NotificationProps> = ({friendshipId}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();

    console.log(friendshipId);

    return (
        <Grid bgcolor={theme.palette.background.default} container>
            <Grid item>
                <IconButton onClick={() => friendshipSolicitationResponse(friendshipId, true)}>
                    <CheckCircle color="primary"></CheckCircle>
                </IconButton>
                <IconButton onClick={() => friendshipSolicitationResponse(friendshipId, false)}>
                    <CloseIcon color="disabled"></CloseIcon>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default FriendshipResponseButtons;
