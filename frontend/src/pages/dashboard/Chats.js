import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import {
    ArchiveBox,
    CircleDashed,
    MagnifyingGlass,
    Users,
} from "phosphor-react";
import {SimpleBarStyle} from "../../components/Scrollbar";
import {useTheme} from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import BottomNav from "../../layouts/dashboard/BottomNav";
import ChatElement from "../../components/ChatElement";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../components/Search";
import Friends from "../../sections/Dashboard/Friends";
import {useDispatch, useSelector} from "react-redux";
import {SetConversationBlockedMe, SetConversationUnblockedMe} from "../../redux/slices/conversation";


const Chats = () => {
    const {user_id} = useSelector((state) => state.auth);
    const theme = useTheme();
    const isDesktop = useResponsive("up", "md");

    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth);

    const {user, isWebSocketsConnected, lastBlocker, lastUnblocker} = useSelector((state) => state.app);

    const {conversations} = useSelector((state) => state.conversation.direct_chat);

    useEffect(() => {
        dispatch(SetConversationBlockedMe(lastBlocker));

    }, [lastBlocker]);

    useEffect(() => {
        dispatch(SetConversationUnblockedMe(lastUnblocker));

    }, [lastUnblocker]);

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    width: isDesktop ? 320 : "100vw",
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F8FAFF"
                            : theme.palette.background,

                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                {!isDesktop && (
                    // Bottom Nav
                    <BottomNav/>
                )}

                <Stack p={3} spacing={2} sx={{maxHeight: "100vh"}}>
                    <Stack
                        alignItems={"center"}
                        justifyContent="space-between"
                        direction="row"
                    >
                        <Typography variant="h5">Conversas</Typography>

                        <Stack direction={"row"} alignItems="center" spacing={1}>
                            <IconButton
                                onClick={() => {
                                    handleOpenDialog();
                                }}
                                sx={{width: "max-content"}}
                            >
                                <Users/>
                            </IconButton>
                            <IconButton sx={{width: "max-content"}}>
                                <CircleDashed/>
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack sx={{width: "100%"}}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6"/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Pesquisar…"
                                inputProps={{"aria-label": "search"}}
                            />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction={"row"} spacing={1.5} alignItems="center">
                            <ArchiveBox size={24}/>
                            <Button variant="text">Arquivar</Button>
                        </Stack>
                        <Divider/>
                    </Stack>
                    <Stack sx={{flexGrow: 1, overflow: "scroll", height: "100%"}}>
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{color: "#676667"}}>
                                    Todas as Conversas
                                </Typography>
                                {conversations
                                    .filter((el) => !el.pinned && el.displayed)
                                    .sort((b, a) => new Date(a.time) - new Date(b.time))
                                    .map((el, idx) => {
                                        return <ChatElement {...el} />;
                                    })}

                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && (
                <Friends open={openDialog} handleClose={handleCloseDialog}/>
            )}
        </>
    );
};

export default Chats;
