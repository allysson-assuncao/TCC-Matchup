import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, Chip, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft, GameController, Prohibit, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE_INTERESTS, ROUTE_MY_PROFILE, ROUTE_PAGE_NOT_FOUND} from "../../routes";
import {getProfileByUsernameAndUserId} from "../../api/user_requests/profile";
import ProfileButtons from "../../sections/Dashboard/Settings/ProfileButtons";
import BlockButtons from "../../sections/Dashboard/Settings/BlockButtons";
import {NOTIFICATION_TYPES} from "../../components/NotificationElement";

const Profile = () => {
        const theme = useTheme();
        const dispatch = useDispatch();
        const {
            user,
            notifications,
            lastEndedFriendshipList,
            lastBlocker,
            lastUnblocker,
            lastFriendshipResponse
        } = useSelector((state) => state.app);
        const {isLoggedIn} = useSelector((state) => state.auth);

        const [profile, setProfile] = useState(null);

        const navigate = useNavigate();

        const {usernamePathVariable} = useParams();


        useEffect(() => {
                if (usernamePathVariable == user.username) navigate(ROUTE_MY_PROFILE);
                if (!usernamePathVariable || usernamePathVariable === "") navigate(ROUTE_PAGE_NOT_FOUND);

                const fetchData = async () => {
                    const profile = await getProfileByUsernameAndUserId(usernamePathVariable, user.id);
                    setProfile(profile);
                }
                fetchData();

            }, [usernamePathVariable]
        );

        useEffect(() => {
            if (!profile || !notifications || notifications.length === 0) return;
            if (notifications[notifications.length - 1].senderId === profile.id && notifications[notifications.length - 1].type !== NOTIFICATION_TYPES.DEFAULT) {
                let notification = notifications[notifications.length - 1];
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    friendshipStatus: notification.type,
                    doesFriendshipExist: notification.type === NOTIFICATION_TYPES.PENDING || notification.type === NOTIFICATION_TYPES.ACCEPTED
                }));
            }
        }, [notifications])

        /*useEffect(() => {
                if (!profile) return;
                if (lastEndedFriendshipList === profile.id) {
                    setProfile((prevProfile) => ({...prevProfile, doesFriendshipExist: false}));
                }
            }, [lastEndedFriendshipList]);*/

        useEffect(() => {
            if (!profile || !lastEndedFriendshipList || lastEndedFriendshipList.length === 0) return;
            if (lastEndedFriendshipList[lastEndedFriendshipList.length - 1] === profile.id) {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    doesFriendshipExist: false,
                    friendshipStatus: NOTIFICATION_TYPES.REJECTED, //*****************
                }));
            }
        }, [lastEndedFriendshipList]);

        useEffect(() => {
            if (!profile || !lastBlocker || lastBlocker.length === 0) return;
            if (lastBlocker[lastBlocker.length - 1] === profile.id) {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    //friendshipStatus: notification.type,
                    blockedMe: true
                }));
            }
        }, [lastBlocker]);

        useEffect(() => {
            if (!profile || !lastUnblocker || lastUnblocker.length === 0) return;
            if (lastUnblocker[lastUnblocker.length - 1] === profile.id) {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    //friendshipStatus: notification.type,
                    blockedMe: false
                }));
            }
        }, [lastUnblocker]);

        useEffect(() => {
            if (!profile || !lastFriendshipResponse || lastFriendshipResponse.length === 0) return;
            let previousFriendshipResponse = lastFriendshipResponse[lastFriendshipResponse.length - 1];
            if (previousFriendshipResponse.respondedId === profile.id) {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    doesFriendshipExist: previousFriendshipResponse.accepted,
                    friendshipStatus: previousFriendshipResponse.accepted ? NOTIFICATION_TYPES.ACCEPTED : NOTIFICATION_TYPES.REJECTED,

                }));
            }
        }, [lastFriendshipResponse]);


        return (
            <>
                <Stack direction="row" sx={{width: "100%"}}>
                    {/* Left Pane */}
                    <Box
                        justifyContent={'center'}
                        sx={{
                            justifyContent: 'center',
                            overflowY: "scroll",
                            height: "100vh",
                            width: 400,
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? "#F8FAFF"
                                    : theme.palette.background,

                            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        {profile && (
                            <Stack p={4} spacing={7}>
                                {/* Header */}
                                <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} spacing={3}>
                                    <IconButton>
                                        <CaretLeft size={24} color={"#4B4B4B"} onClick={() => navigate(-1)}/>
                                    </IconButton>

                                    <Typography variant="h5">{usernamePathVariable}</Typography>

                                    <BlockButtons profile={profile} setProfile={setProfile}/>
                                </Stack>

                                {/* MyProfile Edit Form */}
                                <Stack spacing={4} alignItems={"center"}>
                                    <Avatar
                                        src={profile.profilePicture}
                                        alt={profile.name}
                                        sx={{height: 128, width: 128}}
                                    />

                                    {/*<Stack direction="row" alignItems={"center"} spacing={2}>
                                        <Button
                                            onClick={() => {
                                                //setOpenBlock(true);
                                            }}
                                            fullWidth
                                            startIcon={<Prohibit/>}
                                            variant="outlined"
                                        >
                                            Block
                                        </Button>
                                    </Stack>
*/}
                                    <ProfileButtons profile={profile} setProfile={setProfile}></ProfileButtons>

                                    <Typography
                                        color={theme.palette.primary.main}
                                        variant="h4"
                                        sx={{
                                            cursor: "pointer",
                                            textAlign: "center",
                                            flexGrow: 1,
                                        }}
                                    >
                                        {profile.name}
                                    </Typography>

                                    <Typography
                                        color={theme.palette.primary.main}
                                        variant="body1"
                                        sx={{
                                            maxWidth: "100%",
                                            wordWrap: "break-word",
                                            textAlign: "center", // Centraliza horizontalmente o texto
                                        }}
                                    >
                                        {profile.bio}
                                        {profile.interestNames &&
                                            profile.interestNames.length !== 0 && (
                                                <>
                                                    {profile.interestNames.map((text, index) => (
                                                        <Chip key={index} label={text} style={{ margin: 4 }} />
                                                    ))}
                                                </>
                                            )}
                                    </Typography>

                                    <Button
                                        onClick={() => {
                                            navigate(`${ROUTE_INTERESTS}/${usernamePathVariable}`);
                                        }}
                                        title={"Interesses"}
                                        startIcon={<GameController/>}
                                        variant="contained"
                                    >
                                        Interesses
                                    </Button>

                                </Stack>
                            </Stack>)}
                        {!profile && (
                            <Typography color={theme.palette.primary.main} variant="h4">Loading...</Typography>
                        )}
                    </Box>
                    {/* Right Pane */}
                    <Box
                        sx={{
                            height: "100%",
                            width: "calc(100vw - 500px )",
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? "#FFF"
                                    : theme.palette.background.paper,
                            borderBottom: "6px solid #0162C4",
                        }}


                    ></Box>
                </Stack>

            </>
        );
    }
;

export default Profile;