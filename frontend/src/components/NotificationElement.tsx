import React from "react";
import {IconButton, Grid, Typography, Avatar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {Clear} from "@mui/icons-material";
import FriendshipResponseButtons from "../sections/Dashboard/Settings/FriendshipResponseButtons";
import {ROUTE_PROFILE} from "../routes";
import {dispatch} from "../redux/store";
import {RemoveNotification} from "../redux/slices/app";
import {formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {deleteNotification} from "../api/user_requests/notificationRequests";

export const NOTIFICATION_TYPES = {
    DEFAULT: 'DEFAULT',
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
}

export const SOLICITATION_TEXT = {
    PENDING: ` te enviou um pedido de amizade`,
    ACCEPTED: ' aceitou seu pedido de amizade',
    REJECTED: 'negou seu pedido de amizade'
}

interface NotificationProps {
    /*id: bigint;
    content?: string;
    type: string;
    senderId: bigint;
    senderUsername: string;
    date: Date;
    friendshipId: bigint;
    removeNotificationById?: (notificationId: bigint) => void;*/
    notification: any
}

const NotificationComponent: React.FC<NotificationProps> = ({notification}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    var text;

    const formattedDate = formatDistanceToNow(new Date(notification.date), {addSuffix: true, locale: ptBR});

    /*npm install date-fns
npm install @date-fns/locale-pt-BR
*/


    switch (notification.type) {
        case NOTIFICATION_TYPES.PENDING:
            text = SOLICITATION_TEXT.PENDING;
            break;
        case NOTIFICATION_TYPES.ACCEPTED:
            text = SOLICITATION_TEXT.ACCEPTED;
            break;
        /* case NOTIFICATION_TYPES.REJECTED:
             text = SOLICITATION_TEXT.REJECTED;
             break;*/
        case NOTIFICATION_TYPES.DEFAULT:
            text = notification.content;
            break;
    }

    return (
        <Grid bgcolor={theme.palette.background.default} alignItems={"center"} alignContent={"center"} container
              spacing={3}>
            <Grid item>
                {notification.type !== NOTIFICATION_TYPES.DEFAULT &&
                    /*<ProfilePicture id={senderId} small={true}/>*/
                    <Avatar
                        onClick={() => navigate(`${ROUTE_PROFILE}/${notification.senderUsername}`)}
                        src={notification.senderProfilePicture}
                        alt={notification.senderUsername}
                        sx={{height: 64, width: 64}}
                    />
                }
            </Grid>
            <Grid item>
                <Typography color={theme.palette.text.primary}>
                    {notification.senderUsername && notification.type !== NOTIFICATION_TYPES.DEFAULT &&
                        <b style={{cursor: 'pointer'}}
                           onClick={() => navigate(`${ROUTE_PROFILE}/${notification.senderUsername}`)}>
                            {notification.senderUsername}
                        </b>
                    }
                    {text}
                    <span><b>{formattedDate}</b> </span>
                </Typography>
            </Grid>
            <Grid item>
                {notification.type === NOTIFICATION_TYPES.PENDING && notification.senderUsername &&
                    <FriendshipResponseButtons notification={notification}/>
                }
                {notification.type !== NOTIFICATION_TYPES.PENDING &&
                    <IconButton
                        onClick={() => {
                            deleteNotification(notification.id).then((response) => {
                                    if (response) dispatch(RemoveNotification(notification.id));
                                }
                            )

                        }}
                    >
                        <Clear color="error"></Clear>
                    </IconButton>
                }
            </Grid>

        </Grid>
    );
}

export default NotificationComponent;
