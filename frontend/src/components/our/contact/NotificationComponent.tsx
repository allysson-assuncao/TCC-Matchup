import React from "react";
import {IconButton, Grid, Typography} from "@mui/material";
import ProfilePicture from "../ProfilePicture";
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import getTheme from "../../theme";
import {CheckCircle, Clear} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";
import {ROUTE_PROFILE} from "../../App";
import FriendshipResponseButtons from "./FriendshipResponseButtons";
import {deleteNotification} from "../../api/user_requests/notificationRequests";
import {Notification} from "../../model/notification";

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
    id: bigint;
    content?: string;
    type: string;
    senderId: bigint;
    senderUsername: string;
    date: Date;
    friendshipId: bigint;
    removeNotificationById?: (notificationId: bigint) => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({removeNotificationById, content, type, senderId, senderUsername, id, date, friendshipId}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();
    var text;

    

    switch (type) {
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
            text = content;
            break;
    }

    return (
        <Grid bgcolor={theme.palette.background.default} container>
            <Grid item>
                {type !== NOTIFICATION_TYPES.DEFAULT &&
                    <ProfilePicture id={senderId} small={true}/>
                }
            </Grid>
            <Grid alignItems="center" item>
                <Typography color={theme.palette.text.primary}>
                    {senderUsername && type !== NOTIFICATION_TYPES.DEFAULT &&
                        <b style={{cursor: 'pointer'}}
                           onClick={() => history(`${ROUTE_PROFILE}/${senderUsername}`)}>{senderUsername}</b>
                    }
                    {text}
                </Typography>
            </Grid>
            <Grid item>
                {type === NOTIFICATION_TYPES.PENDING && senderUsername &&
                    <FriendshipResponseButtons notificationId={id} removeNotificationById={removeNotificationById} friendshipId={friendshipId}/>
                }
                {type !== NOTIFICATION_TYPES.PENDING &&
                    <IconButton
                        onClick={() => {
                            deleteNotification(id);
                            if(removeNotificationById) removeNotificationById(id);
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
