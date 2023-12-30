import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, Chip, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft, CaretRight, Chat, GameController, Prohibit, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE_CHAT, ROUTE_INTERESTS, ROUTE_MY_PROFILE, ROUTE_PAGE_NOT_FOUND, ROUTE_PROFILE} from "../../routes";
import {getProfileByUsernameAndUserId, getProfileNotIncludedInIds} from "../../api/user_requests/profile";
import ProfileButtons from "../../sections/Dashboard/Settings/ProfileButtons";
import BlockButtons from "../../sections/Dashboard/Settings/BlockButtons";
import {NOTIFICATION_TYPES} from "../../components/NotificationElement";
import {SelectConversation, UpdateLastEndedFriendship} from "../../redux/slices/app";
import {FRIENDSHIP_STATUS} from "../../model/friendship";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {ROUTE_INTEREST_MANAGEMENT} from "../../App2";
import {client} from "../../socket";
import {SetCurrentConversationFake} from "../../redux/slices/conversation";

const ProfileSearch = () => {
        const theme = useTheme();
        const dispatch = useDispatch();
        const {
            user,
            notifications,
            lastEndedFriendshipList,
            lastFriendshipResponse
        } = useSelector((state) => state.app);
        const {isLoggedIn, token} = useSelector((state) => state.auth);
        const {conversations} = useSelector((state) => state.conversation.direct_chat);

        const [profileList, setProfileList] = useState([]);

        const [profile, setProfile] = useState(null);

        const [index, setIndex] = useState(0);

        const navigate = useNavigate();

        async function handleLeft() {
            if (index == 0) {
                await setIndex(profileList.length - 1);
                setProfile(profileList[profileList.length - 1]);
            } else {
                setProfile(profileList[index - 1]);
                await setIndex(index - 1);
            }
        }

        async function handleRight() {
            if (index >= profileList.length - 1) {
                const searchedProfile = await getProfileNotIncludedInIds(token, profileList.map(profile => profile.id));
                console.log(searchedProfile);
                if (!searchedProfile || searchedProfile == "") {
                    setIndex(0);
                    setProfile(profileList[0]);
                    return;
                } else {
                    setProfileList((prevProfileList) => [...prevProfileList, searchedProfile]);
                    setProfile(searchedProfile);
                }

            } else {
                setProfile(profileList[index + 1]);
            }

            await setIndex(index + 1)/* % profileList.length*/;
        }

        useEffect(() => {
            const searchFirstProfile = async () => {
                const searchedProfile = await getProfileNotIncludedInIds(token, []);
                console.log(searchedProfile)
                await setProfileList((prevProfileList) => [...prevProfileList, searchedProfile])
                await setIndex(index);
                setProfile(searchedProfile);
            }

            searchFirstProfile()

        }, []);

        const [randomValue, setRandomValue] = useState(0);

        useEffect(() => {
            const value = (Math.random() * (300 - 0.1) + 0.1).toFixed(1);
            setRandomValue(value);
        }, [profile]);


        /*useEffect(() => {
            if (!profile || !notifications || notifications.length === 0) return;
            if (notifications[notifications.length - 1].senderId === profile.id && notifications[notifications.length - 1].type !== NOTIFICATION_TYPES.DEFAULT) {
                let notification = notifications[notifications.length - 1];
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    friendshipStatus: notification.type,
                    doesFriendshipExist: notification.type === NOTIFICATION_TYPES.PENDING || notification.type === NOTIFICATION_TYPES.ACCEPTED
                }));
            }
        }, [notifications]);

        useEffect(() => {
            if (!profile || !lastEndedFriendshipList || lastEndedFriendshipList.length === 0) return;
            if (lastEndedFriendshipList[lastEndedFriendshipList.length - 1] === profile.id) {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    doesFriendshipExist: false,
                    friendshipStatus: NOTIFICATION_TYPES.REJECTED, //!*****************
                }));
            }
        }, [lastEndedFriendshipList]);

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
        }, [lastFriendshipResponse]);*/


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
                                <Stack direction="row" justifyContent={"center"} alignItems={"center"}
                                       spacing={3}>
                                    <Typography sx={{cursor: "pointer"}} justifyContent={"center"} variant="h5"
                                                title={"Acessar perfil"}
                                                onClick={() => navigate(`${ROUTE_PROFILE}/${profile.username}`)}>{profile.username}</Typography>
                                </Stack>

                                {/* MyProfile Edit Form */}
                                <Stack spacing={4} alignItems={"center"}>
                                    <Avatar

                                        src={profile.profilePicture}
                                        alt={profile.name}
                                        sx={{height: 128, width: 128, cursor: "pointer"}}
                                        onClick={() => navigate(`${ROUTE_PROFILE}/${profile.username}`)}
                                        title={"Acessar perfil"}
                                    />

                                    <Stack direction="row">
                                        <Button
                                            startIcon={<Chat/>}
                                            onClick={() => {
                                                    const contact_fake = {
                                                        name: profile.username,
                                                        online: true,
                                                        img: profile.profilePicture,
                                                        user_id: profile.id,
                                                    }
                                                    console.log("contact_fake");
                                                    dispatch(SetCurrentConversationFake(contact_fake));
                                                    dispatch(SelectConversation({room_id: null}));
                                                    navigate(ROUTE_CHAT);
                                                }
                                            }
                                        >
                                            Conversar
                                        </Button>

                                        <ProfileButtons profile={profile} setProfile={setProfile}></ProfileButtons>
                                    </Stack>

                                    <Typography
                                        color={theme.palette.primary.main}
                                        title={"Acessar perfil"}
                                        onClick={() => navigate(`${ROUTE_PROFILE}/${profile.username}`)}
                                        variant="h4"
                                        sx={{cursor: "pointer"}}
                                    >
                                        {profile.name}
                                    </Typography>

                                    <Typography color={randomValue < 1 ? "red" : (randomValue < 10 ? "orange" :theme.palette.secondary)}
                                                variant="body1">Há {randomValue} km de você</Typography>

                                    <Typography color={theme.palette.primary.main}
                                                variant="body1">{profile.bio}</Typography>

                                    {profile.interestNames && profile.interestNames.length != 0
                                        && (<Stack direction={'row'} justifyContent={"right"} spacing={5}>
                                        {profile.interestNames.map((text, index) => (
                                            <Chip key={index} label={text} style={{margin: 4}}/>
                                        ))}
                                    </Stack>)}

                                    <Button
                                        onClick={() => {
                                            handleLeft();
                                        }}
                                        /*disabled={index == 0 || !profileList}*/
                                        title={(profileList.length == 0 || !profileList) ? 'Não há perfis a esquerda ainda' : "Clique para ver o perfil da esquerda!"}
                                        fullWidth
                                        startIcon={<CaretLeft/>}
                                        variant="contained"
                                    >
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleRight();
                                        }}
                                        title={"Clique para ver o perfil da direita!"}
                                        fullWidth
                                        startIcon={<CaretRight/>}
                                        variant="contained"
                                    >
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
                            width: "calc(100vw - 420px )",
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

export default ProfileSearch;
