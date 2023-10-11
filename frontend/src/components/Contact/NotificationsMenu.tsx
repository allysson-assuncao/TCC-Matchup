import {useEffect, useState} from "react";
import axios from "axios";
import Notification from "./Notification";
import {getNotificationsByUserId} from "../../api/user_requests/notification";
import {getUser} from "../../pages/home/Home";
import {getUserByUsername} from "../../api/user_requests/getUserBy";
import {Grid} from "@mui/material";

const NotificationMenu = () => {
    const [notifications, setNotifications] = useState<Object[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let notifications = await getNotificationsByUserId(getUser().id);

            setNotifications(notifications);


        };

        fetchData();
    }, []);

    return (
        <Grid>
            {notifications.map(notification =>
                <Notification
                    key={notification.id}
                    text={notification.text}
                    type={notification.type}
                    sender={notification.sender}
                    date={notification.date}
                />
            )}
        </Grid>
    );
};

export default NotificationMenu;