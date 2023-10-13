import {useEffect, useState} from "react";
import {getNotificationsByUserId} from "../../api/user_requests/notificationRequests";
import {getUser} from "../../pages/home/Home";
import {Badge, Box, Menu, Tooltip} from "@mui/material";
import {Notification} from "../../model/notification";
import NotificationComponent from "./NotificationComponent";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {Notifications} from "@mui/icons-material";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";

const NotificationsMenu = () => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = useState<Notification[]>();
    const [unseenNotificationsNumber, setUnseenNotificationsNumber] = useState<number>(0);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        /*// @ts-ignore
        const unseenNotifications = notifications.filter(notification => !notification.viewed);

        // Atualiza o status de visualização das notificações não visualizadas para true
        const updatedNotifications = unseenNotifications.map(notification => ({
            ...notification,
            viewed: true
        }));

        setNotifications(prevNotifications => {
            // @ts-ignore
            return prevNotifications.map(notification => {
                const updatedNotification = updatedNotifications.find(updatedNotif => updatedNotif.id === notification.id);
                return updatedNotification ? updatedNotification : notification;
            });
        });*/
        setUnseenNotificationsNumber(0);

    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /*useEffect(() => {
        const fetchData = async () => {
            let notifications = await getNotificationsByUserId(getUser().id);
            const unseenCount = notifications.filter(notification => !notification.viewed).length;
            setUnseenNotificationsNumber(unseenCount);
            console.log(notifications);
            setNotifications(notifications);
        };
        fetchData();
    }, [getUser().id, notifications]);*/

    const fetchNotifications = async () => {
        try {
            const fetchedNotifications = await getNotificationsByUserId(getUser().id);
            setNotifications(fetchedNotifications);
            const unseenCount = fetchedNotifications.filter(notification => !notification.viewed).length;
            setUnseenNotificationsNumber(unseenCount);
        } catch (error) {
            // Trate erros da requisição aqui, se necessário
            console.error("Erro ao buscar notificações:", error);
        }
    };

    useEffect(() => {
        // Busca notificações quando o componente é montado inicialmente
        fetchNotifications();
    }, []);

    /*useEffect(() => {
        // @ts-ignore
        const unseenCount = notifications.filter(notification => !notification.viewed).length;
        setUnseenNotificationsNumber(unseenCount);
    }, [notifications]);*/

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip onClick={handleOpenUserMenu} title="Abrir opções">
                <IconButton>
                    <Badge badgeContent={unseenNotificationsNumber} color="primary"
                           sx={{p: 0}}>
                        <Notifications sx={{color: `${theme.palette.text.primary}`}}/>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu

                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {notifications && notifications.map(notification => {
                    return (
                        <NotificationComponent
                            key={notification.id.toString()}
                            id={notification.id}
                            content={notification.content}
                            type={notification.type}
                            senderId={notification.senderId}
                            senderUsername={notification.senderUsername}
                            date={notification.date}
                            friendshipId={notification.friendshipId}
                        />
                    );
                })}
            </Menu>
        </Box>
    );
};

export default NotificationsMenu;