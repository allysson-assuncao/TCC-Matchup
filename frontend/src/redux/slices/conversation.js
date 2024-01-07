import {createSlice} from "@reduxjs/toolkit";
import {faker} from "@faker-js/faker";
import {AWS_S3_REGION, S3_BUCKET_NAME} from "../../config";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";
import {client} from "../../socket";
import {showSnackbar} from "./app";

//const user_id = window.localStorage.getItem("user_id");

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_conversation_fake: null,
        current_messages: [],
        unreadMessagesCount: 0,
    },
    group_chat: {},
};

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        resetState: (state) => initialState,
        fetchDirectConversations(state, action) {
            state.direct_chat.unreadMessagesCount = 0;
            const list = action.payload.conversations.map((el) => {
                state.direct_chat.unreadMessagesCount += el.unreadMessages;
                console.log("UnreadMessagesCount" + state.direct_chat.unreadMessagesCount);
                return {
                    id: el.id,
                    user_id: el.user2Id,
                    name: el.user2Username,
                    online: true,
                    img: el.profilePicture,
                    msg: el.user2Id != el.lastMessage.receiverId ? el.lastMessage.hashedText : "Você: " + el.lastMessage.hashedText,
                    msgId: el.lastMessage.id,
                    time: /*formatDistanceToNow(new Date(*/el.lastMessage.date/*), {addSuffix: true, locale: ptBR})*/,
                    unread: el.unreadMessages,
                    blockedMe: el.blockedMe,
                    blockedByMe: el.blockedByMe,
                    displayed: el.displayed,
                    pinned: false,
                    disabled: el.disabled,
                    bio: el.bio,
                };

            });
            console.log(list);
            state.direct_chat.conversations = list;
        },

        addDirectConversation(state, action) {
            const contact = action.payload.conversation;

            const conversation = {
                id: contact.id,
                user_id: contact.user2Id,
                name: contact.user2Username,
                online: true,
                img: contact.profilePicture,
                unread: 0,
                pinned: false,
                disabled: contact.disabled,
                bio: contact.bio,
            }
            state.direct_chat.conversations.push(conversation);
            if (contact.creatorId != contact.user2Id) {
                state.direct_chat.current_conversation = conversation;
            }

        },
        setCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload.current_conversation; ////////////////
            state.direct_chat.current_conversation_fake = null;
        },
        setCurrentConversationFake(state, action) {
            state.direct_chat.current_conversation_fake = action.payload.current_conversation_fake; ////////////
            state.direct_chat.current_messages = [];
        },
        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            const user_id = action.payload.user_id;

            const formatted_messages = messages.map((el) => {
                /*const formattedDate = formatDistanceToNow(new Date(el.date), {addSuffix: true, locale: ptBR});*/

                return {
                    id: el.id,
                    type: "msg",
                    subtype: el.type,
                    text: el.hashedText,
                    incoming: el.receiverId == user_id,
                    outgoing: el.senderId == user_id,
                    date: el.date,
                    viewed: el.viewed,
                    image: el.hashedImage,
                    audio: el.hashedAudio
                };
            });
            state.direct_chat.current_messages = formatted_messages;
        },
        addDirectMessage(state, action) {
            const user_id = action.payload.user_id;
            console.log(action.payload.message);
            console.log((action.payload.message.receiverId == user_id) + " " + user_id);
            console.log((action.payload.message.senderId == user_id) + " " + user_id);
            //state.direct_chat.current_messages = [...state.direct_chat.current_messages, action.payload.message];
            if (state.direct_chat.current_messages.some(message => message.id == action.payload.message.id)) {
                return;
            }
            /*if (action.payload.message.id == )*/
            state.direct_chat.current_messages.push({
                id: action.payload.message.id,
                type: "msg",
                subtype: action.payload.message.type,
                text: action.payload.message.hashedText,
                incoming: action.payload.message.receiverId == user_id,
                outgoing: action.payload.message.senderId == user_id,
                date: action.payload.message.date,
                viewed: action.payload.message.viewed,
                image: action.payload.message.hashedImage,
                audio: action.payload.message.hashedAudio
            });
        },
        setUnseenMessages(state, action) {
            state.direct_chat.conversations.forEach((conversation) => {
                if (conversation.id === action.payload.conversationId) {
                    state.direct_chat.unreadMessagesCount -= conversation.unread;
                    conversation.unread = 0;
                }
            });
        },
        addUnreadMessagesCount(state, action) {
            state.direct_chat.unreadMessagesCount += 1;
        },
        addUnreadMessagesCountInContactsByConversation(state, action) {///
            const user_id = action.payload.user_id;
            state.direct_chat.conversations.forEach((conversation) => {
                if (conversation.msgId == action.payload.message.id) return;
                if (conversation.id == action.payload.contactId) {

                    if ((action.payload.room_id && (conversation.id == action.payload.room_id)
                        && (action.payload.message.receiverId == user_id))) {
                        client.publish({
                            destination: `/app/view-message`,
                            body: JSON.stringify(action.payload.message.id),
                        });
                    } else if (action.payload.message.receiverId == user_id) {
                        state.direct_chat.unreadMessagesCount += 1;
                        conversation.unread += 1;
                    }

                    conversation.time = action.payload.message.date;
                    console.log(conversation.user_id != action.payload.message.receiverId);
                    if (action.payload.message.messageType == "TEXT") {
                        conversation.msg = conversation.user_id != action.payload.message.receiverId ? action.payload.message.hashedText : "Você: " + action.payload.message.hashedText;
                    }
                }
            });

        },
        setConversationBlockedMe(state, action) {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            state.direct_chat.conversations.forEach(conversation => {
                console.log(conversation.user_id == action.payload.lastBlocker);
                if (conversation.user_id == action.payload.lastBlocker) {
                    conversation = {...conversation, blockedMe: true}
                    conversation.blockedMe = true;
                    if(conversation.id == state.direct_chat.current_conversation.id) {
                        state.direct_chat.current_conversation.blockedMe = true;
                    }
                    console.log(conversation);
                }
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            })
        },
        setConversationUnblockedMe(state, action) {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

            state.direct_chat.conversations.forEach(conversation => {
                console.log(conversation.user_id == action.payload.lastUnblocker);
                if (conversation.user_id == action.payload.lastUnblocker) {
                    conversation = {...conversation, blockedMe: false}
                    conversation.blockedMe = false;
                    if(conversation.id == state.direct_chat.current_conversation.id) {
                        state.direct_chat.current_conversation.blockedMe = false;
                    }
                    console.log(conversation);
                }
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            })
        },
        changeContactDisplay(state, action) {
            state.direct_chat.conversations.forEach((conversation) => {
                if (conversation.id === action.payload.conversationId) {
                    conversation.displayed = !conversation.displayed;
                }
            });
        }
    },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const FetchDirectConversations = ({conversations}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({conversations}));
    };
};

export const SetConversationBlockedMe = (lastBlocker) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setConversationBlockedMe({lastBlocker}));
    };
};

export const SetConversationUnblockedMe = (lastUnblocker) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setConversationUnblockedMe({lastUnblocker}));
    };
};


export const AddDirectConversation = (conversation) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({conversation}));
    };
};
export const UpdateDirectConversation = ({conversation}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({conversation}));
    };
};

export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversation({current_conversation}));
        dispatch(slice.actions.setUnseenMessages({conversationId: current_conversation.id}));
    };
};

export const SetCurrentConversationFake = (current_conversation_fake) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversationFake({current_conversation_fake}));
    };
};


export const FetchCurrentMessages = ({messages}, user_id) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({messages, user_id}));
    }
}

export const AddDirectMessage = (message, user_id) => {
    return async (dispatch, getState) => {
        console.log("AddDirectMessage FORA");
        console.log(message);

        if (message.contactId === getState().app.room_id) {
            console.log("AddDirectMessage dentro" + user_id);
            dispatch(slice.actions.addDirectMessage({message, user_id}))
            dispatch(slice.actions.addUnreadMessagesCountInContactsByConversation(
                {
                    contactId: message.contactId,
                    message: message,
                    room_id: getState().app.room_id
                    , user_id
                }));
        } else {
            /*dispatch(slice.actions.addUnreadMessagesCount({message}));*/
            dispatch(slice.actions.addUnreadMessagesCountInContactsByConversation(
                {
                    message: message,
                    contactId: message.contactId,
                    type: message.messageType
                    , user_id
                }));
        }
    }
}

export function ClearConversation() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.resetState());
        dispatch(showSnackbar({severity: 'success', message: 'A conversa foi limpa com sucesso!'}));
    };
}

export const ChangeContactDisplay = (conversationId) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.changeContactDisplay({conversationId}));
    };
};
