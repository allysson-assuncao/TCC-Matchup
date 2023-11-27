import React from "react";
import {User} from "../../model/user";
import {IconButton, Grid} from "@mui/material";
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import getTheme from "../../theme";
import {CheckCircle} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";
import {friendshipSolicitationResponse} from "../../api/user_requests/friendship";
import {useLoggedUser} from "../../contexts/UserContext";
interface NotificationProps {
    friendshipId: bigint,
    removeNotificationById?: (notificationId: bigint) => void;
    notificationId?: bigint;
    verifyFriendship?: (user: User) => void;
}

const FriendshipResponseButtons: React.FC<NotificationProps> = ({verifyFriendship, notificationId, removeNotificationById, friendshipId}) => {
    const {loggedUser} = useLoggedUser();
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
                    if (!loggedUser) {
                        console.error("Erro: Usuário não está logado.");
                        return;
                    }
                    if (verifyFriendship) verifyFriendship(loggedUser);
                }}>
                    <CheckCircle color="primary"></CheckCircle>
                </IconButton>
                <IconButton onClick={async () => {
                    let response = await friendshipSolicitationResponse(friendshipId, false);
                    if(removeNotificationById && response && notificationId) removeNotificationById(notificationId);
                    if (!loggedUser) {
                        console.error("Erro: Usuário não está logado.");
                        return;
                    }
                    if (verifyFriendship) verifyFriendship(loggedUser);
                }}>
                    <CloseIcon color="disabled"></CloseIcon>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default FriendshipResponseButtons;
