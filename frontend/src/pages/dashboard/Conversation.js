import {Stack, Box} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {SimpleBarStyle} from "../../components/Scrollbar";

import {ChatHeader, ChatFooter} from "../../components/Chat";
import useResponsive from "../../hooks/useResponsive";
import {Chat_History} from "../../data";
import {
    DocMsg,
    LinkMsg,
    MediaMsg,
    ReplyMsg,
    TextMsg,
    Timeline,
} from "../../sections/Dashboard/Conversation";
import {useDispatch, useSelector} from "react-redux";
import {
    ChangeIsFetching,
    FetchCurrentMessages,
    SetCurrentConversation,
} from "../../redux/slices/conversation";
import {client, socket} from "../../socket";

const Conversation = ({isMobile, menu}) => {
    const dispatch = useDispatch();

    const {
        current_conversation,
        conversations, current_messages
    } = useSelector(
        (state) => state.conversation.direct_chat
    );
    const {room_id, user} = useSelector((state) => state.app);

    useEffect(() => {
        console.log(room_id);
        if (!room_id) return;
        const current = conversations.find((el) => el?.id === room_id);

        /*socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
          // data => list of messages
          console.log(data, "List of messages");
          dispatch(FetchCurrentMessages({ messages: data }));
        });*/
        console.log(JSON.stringify({user1Id: user.id, user2Id: current.user_id}));
        /*if (room_id != current.id) {*/
        client.publish({
            destination: `/app/get-private-messages`,
            body: JSON.stringify({user1Id: user.id, user2Id: current.user_id}),
        });
        /*}*/

        dispatch(SetCurrentConversation(current));
    }, [room_id]);

    return (
        <Box p={isMobile ? 1 : 3}>
            <Stack spacing={3}>
                {current_messages.map((el, idx) => {
                    switch (el.type) {
                        case "divider":
                            return (
                                // Timeline
                                <Timeline el={el}/>
                            );

                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    return (
                                        // Media Message
                                        <MediaMsg el={el} menu={menu}/>
                                    );

                                case "doc":
                                    return (
                                        // Doc Message
                                        <DocMsg el={el} menu={menu}/>
                                    );
                                case "Link":
                                    return (
                                        //  Link Message
                                        <LinkMsg el={el} menu={menu}/>
                                    );

                                case "reply":
                                    return (
                                        //  ReplyMessage
                                        <ReplyMsg el={el} menu={menu}/>
                                    );

                                default:
                                    return (
                                        // Text Message
                                        <TextMsg el={el} menu={menu}/>
                                    );
                            }

                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    );
};

const ChatComponent = ({current_conversation_fake}) => {
        const isMobile = useResponsive("between", "md", "xs", "sm");
        const theme = useTheme();
        const dispatch = useDispatch();

        const messageListRef = useRef(null);

        const {
            current_conversation,
            current_messages,
            isFetching,
            unloadedMessages
        } = useSelector((state) => state.conversation.direct_chat);
        const {room_id, user} = useSelector((state) => state.app);
        var areMessagesLoaded = false;

        const handleScroll = async () => {
            /*console.log(areMessagesLoaded);*/
            if (!areMessagesLoaded) return;

            console.log('Is fetching1: ' + isFetching);
            console.log(room_id);
            console.log(current_conversation.id);
            console.log(current_conversation.user_id);
            if (messageListRef.current.scrollTop < 500 && !isFetching && room_id == current_conversation.id) {
                console.log('Is fetching2: ' + isFetching);
                client.publish({
                    destination: `/app/get-old-private-messages`,
                    body: JSON.stringify({
                        user1Id: user.id,
                        user2Id: current_conversation.user_id,
                        page: 2,
                        size: 5,
                        orderBy: "date",
                        direction: "ASC"
                    }),
                });
                dispatch(ChangeIsFetching());
                console.log('Is fetching3: ' + isFetching)
            }
        };

        useEffect(() => {
            messageListRef.current.addEventListener('scroll', handleScroll);
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;

            return () => {
                messageListRef.current.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useEffect(() => {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }, [room_id]);

        useEffect(() => {
            // Scroll to the bottom of the message list when new messages are added
            /*console.log("top " + messageListRef.current.scrollTop);
            console.log("height " + messageListRef.current.scrollHeight);*/
            console.log(messageListRef.current.scrollTop > messageListRef.current.scrollHeight - 2000);
            /*if (messageListRef.current.scrollTop > messageListRef.current.scrollHeight - 2000) {*/
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            areMessagesLoaded = true;
            /*}*/
        }, [current_messages]);
        return (
            <Stack
                height={"100%"}
                maxHeight={"100vh"}
                width={isMobile ? "100vw" : "auto"}
            >
                {/*  */}
                <ChatHeader current_conversation_fake={current_conversation_fake}/>
                <Box
                    ref={messageListRef}
                    width={"100%"}
                    sx={{
                        position: "relative",
                        flexGrow: 1,
                        overflow: "scroll",

                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#F0F4FA"
                                : theme.palette.background,

                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <SimpleBarStyle timeout={500} clickOnTrack={false}>
                        <Conversation menu={true} isMobile={isMobile}/>
                    </SimpleBarStyle>
                </Box>

                {/*  */}
                <ChatFooter current_conversation_fake={current_conversation_fake}/>
            </Stack>
        );
    }
;

export default ChatComponent;

export {Conversation};



