import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, Chip, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft, Prohibit, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE_MY_PROFILE} from "../../routes";
import {getProfileByUsernameAndUserId} from "../../api/user_requests/profile";
import ProfileButtons from "../../sections/Dashboard/Settings/ProfileButtons";
import BlockButtons from "../../sections/Dashboard/Settings/BlockButtons";

const Profile = () => {
        const theme = useTheme();
        const dispatch = useDispatch();
        const {user} = useSelector((state) => state.app);
        const {isLoggedIn} = useSelector((state) => state.auth);

        const [profile, setProfile] = useState(null);

        const navigate = useNavigate();

        const {usernamePathVariable} = useParams();


        useEffect(() => {
                if (usernamePathVariable == user.username) navigate(ROUTE_MY_PROFILE);

                const fetchData = async () => {
                    const profile = await getProfileByUsernameAndUserId(usernamePathVariable, user.id);
                    setProfile(profile);
                }
                fetchData();

            }, []
        );


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
                                        <CaretLeft size={24} color={"#4B4B4B"}/>
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

                                    <Typography color={theme.palette.primary.main} variant="h4">{profile.name}</Typography>

                                    <Typography color={theme.palette.primary.main}
                                                variant="body1">{profile.bio}</Typography>

                                    <Stack direction={'row'} justifyContent={"right"} spacing={5}>
                                        {profile.interestNames.map((text, index) => (
                                            <Chip key={index} label={text} style={{ margin: 4 }} />
                                        ))}
                                    </Stack>
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

export default Profile;
