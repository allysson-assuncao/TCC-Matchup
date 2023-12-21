import React, {useEffect, useState} from "react";
import {Badge, Box, Fade, Menu, Stack, Typography} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";

import {useNavigate} from "react-router-dom";

import NotificationElement from "../../components/NotificationElement";
import {GetNotifications} from "../../redux/slices/app";
import {Notifications} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {getUnseenNotificationsCountByUserId} from "../../api/user_requests/notificationRequests";

const NotificationMenu = () => {
    const {user, notifications} = useSelector((state) => state.app);
    const {isLoggedIn, token, user_id} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [isNotificationsFetched, setNotificationsFetched] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        //await fetchNotifications();
        if(isNotificationsFetched == false){
            fetchNotifications();
        }
        setNotificationsFetched(true);
        setUnseenNotificationsNumber(0);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //const [notifications, setNotifications] = useState([]);
    const [unseenNotificationsNumber, setUnseenNotificationsNumber] = useState(0);

    //const user_id = window.localStorage.getItem("user_id");

    const user_name = user?.userName;

    const fetchNotifications = async () => {
        if (!isLoggedIn) return;

        try {
            dispatch(GetNotifications());
            /*const fetchedNotifications = await getNotificationsByUserId(loggedUser.id);
            setNotifications(fetchedNotifications);*/
            /*let unseenCount = await getUnseenNotificationsCountByUserId*/
            //const unseenCount = fetchedNotifications.filter(notification => !notification.viewed).length;
            //setUnseenNotificationsNumber(unseenCount);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    const fetchUnseenNotificationsCount = async () => {
        if (!isLoggedIn) return;
        try {
            let unseenNotificationsCount = await getUnseenNotificationsCountByUserId(token);
            setUnseenNotificationsNumber(unseenNotificationsCount);
        } catch (error) {
            console.error("Erro ao buscar número de notificações não visualizadas:", error);
        }
    };

    useEffect(() => {
        fetchUnseenNotificationsCount();
    }, []);

    useEffect(() => {
        fetchUnseenNotificationsCount();
    }, [notifications]);

    /*const removeNotificationById = (idToRemove) => {
        if (!notifications || !setNotifications) return;
        const updatedNotifications = notifications.filter(notification => notification.id !== idToRemove);
        setNotifications(updatedNotifications);
    };*/

    return (
        <>

            <IconButton aria-label="Notifications"
                        onClick={(event) => {
                            handleClick(event)
                        }}>
                <Badge color="secondary" badgeContent={unseenNotificationsNumber}>
                    <Notifications/>
                </Badge>
            </IconButton>
            <Menu
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                TransitionComponent={Fade}
                id="profile-positioned-menu"
                aria-labelledby="profile-positioned-button"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box p={1}>
                    <Stack spacing={1}>
                        {!notifications || notifications.length === 0 &&(
                            <Typography>Não há novas notificações no momento</Typography>
                        )}

                        {notifications && (notifications.map((notification) => (
                            <NotificationElement
                                notification={notification}
                            />
                        )))}
                    </Stack>
                </Box>
            </Menu>
        </>
    );
};

export default NotificationMenu;
