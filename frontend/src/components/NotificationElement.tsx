import React from "react";
import {IconButton, Grid, Typography, Avatar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {Clear} from "@mui/icons-material";
import FriendshipResponseButtons from "../sections/Dashboard/Settings/FriendshipResponseButtons";
import {ROUTE_PROFILE} from "../routes";


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


    switch (notification) {
        case NOTIFICATION_TYPES.PENDING:
            text = SOLICITATION_TEXT.PENDING;
            break;
        case NOTIFICATION_TYPES.ACCEPTED:
            text = SOLICITATION_TEXT.ACCEPTED;
            break;
        case NOTIFICATION_TYPES.REJECTED:
            text = SOLICITATION_TEXT.REJECTED;
            break;
        case NOTIFICATION_TYPES.DEFAULT:
            text = notification.content;
            break;
    }

    return (
        <Grid bgcolor={theme.palette.background.default} container>
            <Grid item>
                {notification.notification.type !== NOTIFICATION_TYPES.DEFAULT &&
                    /*<ProfilePicture id={senderId} small={true}/>*/
                    <Avatar
                        src={notification.senderProfilePicture}
                        alt={notification.senderUsername}
                        sx={{height: 64, width: 64}}
                    />
                }
            </Grid>
            <Grid alignItems="center" item>
                <Typography color={theme.palette.text.primary}>
                    {notification.senderUsername && notification.type !== NOTIFICATION_TYPES.DEFAULT &&
                        <b style={{cursor: 'pointer'}}
                           onClick={() => navigate(`${ROUTE_PROFILE}/${notification.senderUsername}`)}>
                            {notification.senderUsername}
                        </b>
                    }
                    {text}
                </Typography>
            </Grid>
            <Grid item>
                {notification.type === NOTIFICATION_TYPES.PENDING && notification.senderUsername &&
                    <FriendshipResponseButtons notification={notification}/>
                }
                {/**/}
                {notification.type !== NOTIFICATION_TYPES.PENDING &&
                    <IconButton
                        onClick={() => {
                            /*TODO -> REMOVE NOTIFICATION ON APP*/
                            //deleteNotification(id);
                            //if (removeNotificationById) removeNotificationById(id);
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
