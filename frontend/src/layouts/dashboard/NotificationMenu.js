import React from "react";
import {Avatar, Box, Fade, Menu, MenuItem, Stack} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";

import {useNavigate} from "react-router-dom";

import NotificationElement from "../../components/NotificationElement";

const NotificationMenu = () => {
    const {user} = useSelector((state) => state.app);
    const {isLoggedIn, user_id} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        //await fetchNotifications();
        setUnseenNotificationsNumber(0);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [notifications, setNotifications] = useState<Notification[]>();
    const [unseenNotificationsNumber, setUnseenNotificationsNumber] = useState<number>(0);

    //const user_id = window.localStorage.getItem("user_id");

    const user_name = user?.userName;

    const fetchNotifications = async () => {
        if (!isLoggedIn) {
            console.error("Erro: Usuário não está logado.");
            return false;
        }
        try {
            const fetchedNotifications = await getNotificationsByUserId(loggedUser.id);
            setNotifications(fetchedNotifications);
            return true;
            let unseenCount = await getUnseenNotificationsCountByUserId
            //const unseenCount = fetchedNotifications.filter(notification => !notification.viewed).length;
            //setUnseenNotificationsNumber(unseenCount);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    const fetchUnseenNotificationsCount = async () => {
        if (!isLoggedIn) {
            console.error("Erro: Usuário não está logado.");
            return;
        }
        try {
            let unseenCount = await getUnseenNotificationsCountByUserId(loggedUser.id);
            setUnseenNotificationsNumber(unseenCount);
        } catch (error) {
            console.error("Erro ao buscar número de notificações não visualizadas:", error);
        }
    };


    useEffect(() => {
        fetchUnseenNotificationsCount();
    }, []);

    const removeNotificationById = (idToRemove) => {
        if (!notifications || !setNotifications) return;
        const updatedNotifications = notifications.filter(notification => notification.id !== idToRemove);
        setNotifications(updatedNotifications);
    };

    return (
        <>
            <Avatar
                id="profile-positioned-button"
                aria-controls={openMenu ? "profile-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                alt={user_name}
                src={user_img}
                onClick={handleClick}
            />
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
                        {/*{Profile_Menu.map((el, idx) => (
                            <MenuItem onClick={handleClose}>
                                <Stack
                                    onClick={() => {
                                        if (idx === 0) {
                                            navigate(ROUTE_MY_PROFILE);
                                        } else if (idx === 1) {
                                            navigate(ROUTE_REGISTER_INTERESTS);
                                        } else if (idx === 2) {
                                            navigate(ROUTE_MANAGE_INTERESTS);
                                        } else if (idx === 3) {
                                            navigate("/settings");
                                        } else {
                                            dispatch(LogoutUser());
                                            dispatch(ClearUser());
                                            socket.emit("end", {user_id});
                                        }
                                    }}
                                    direction="row"
                                    alignItems={"center"}
                                >
                                    <Grid container>
                                        <Grid item md={10} justifyContent={'start'}>
                                            <span>{el.title}</span>
                                        </Grid>
                                        <Grid item md={2} justifyContent={'end'}>
                                            {el.icon}
                                        </Grid>
                                    </Grid>
                                </Stack>{" "}
                            </MenuItem>
                        ))}*/}
                        {notifications && notifications.map(notification => {
                            return (
                                <NotificationElement
                                    key={notification.id.toString()}
                                    id={notification.id}
                                    content={notification.content}
                                    type={notification.type}
                                    senderId={notification.senderId}
                                    senderUsername={notification.senderUsername}
                                    date={notification.date}
                                    friendshipId={notification.friendshipId}
                                    removeNotificationById={removeNotificationById}
                                />
                            );
                        })}
                    </Stack>
                </Box>
            </Menu>
        </>
    );
};

export default NotificationMenu;
