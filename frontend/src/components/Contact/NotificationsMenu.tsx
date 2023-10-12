import {useEffect, useState} from "react";
import {getNotificationsByUserId} from "../../api/user_requests/notificationRequests";
import {getUser} from "../../pages/home/Home";
import {Grid, Typography} from "@mui/material";
import {Notification} from "../../model/notification";
import NotificationComponent from "./NotificationComponent";

const NotificationsMenu = () => {
    const [notifications, setNotifications] = useState<Notification[]>();

    useEffect(() => {
        const fetchData = async () => {
            let notifications = await getNotificationsByUserId(getUser().id);
            console.log(notifications);
            setNotifications(notifications);
        };
        fetchData();
    }, [getUser().id]);

    return (
        <Grid>
            {notifications && notifications.map(notification =>
                /*<Typography> {notification.senderUsername} </Typography>*/
                <NotificationComponent
                    key={notification.id.toString()}
                    id={notification.id}
                    content={notification.content}
                    type={notification.type}
                    senderId={notification.senderId}
                    senderUsername={notification.senderUsername}
                    date={notification.date}
                />
            )}
        </Grid>
    );
};

export default NotificationsMenu;