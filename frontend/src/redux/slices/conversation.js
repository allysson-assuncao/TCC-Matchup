import {createSlice} from "@reduxjs/toolkit";
import {faker} from "@faker-js/faker";
import {AWS_S3_REGION, S3_BUCKET_NAME} from "../../config";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";
import {client} from "../../socket";

//const user_id = window.localStorage.getItem("user_id");

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
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
                    msg: el.user2Id != el.lastMessage.receiverId ?  el.lastMessage.hashedText : "Você: " + el.lastMessage.hashedText,
                    msgId: el.lastMessage.id,
                    time: /*formatDistanceToNow(new Date(*/el.lastMessage.date/*), {addSuffix: true, locale: ptBR})*/,
                    unread: el.unreadMessages,
                    pinned: false,
                    bio: el.bio,
                };

            });

            state.direct_chat.conversations = list;
        },
        /*updateDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            state.direct_chat.conversations = state.direct_chat.conversations.map(
                (el) => {
                    if (el?.id !== this_conversation._id) {
                        return el;
                    } else {
                        const user = this_conversation.participants.find(
                            (elm) => elm._id.toString() !== user_id
                        );
                        return {
                            id: this_conversation._id._id,
                            user_id: user?._id,
                            name: `${user?.firstName} ${user?.lastName}`,
                            online: user?.status === "Online",
                            img: faker.image.avatar(),
                            msg: faker.music.songName(),
                            time: "9:36",
                            unread: 0,
                            pinned: false,
                        };
                    }
                }
            );
        },*/
        /*addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            const user = this_conversation.participants.find(
                (elm) => elm._id.toString() !== user_id
            );
            state.direct_chat.conversations = state.direct_chat.conversations.filter(
                (el) => el?.id !== this_conversation._id
            );
            state.direct_chat.conversations.push({
                id: this_conversation._id._id,
                user_id: user?._id,
                name: `${user?.firstName} ${user?.lastName}`,
                online: user?.status === "Online",
                img: faker.image.avatar(),
                msg: faker.music.songName(),
                time: "9:36",
                unread: 0,
                pinned: false,
            });
        },*/
        setCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload;
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

                    if((action.payload.room_id && (conversation.id == action.payload.room_id)
                        && (action.payload.message.receiverId == user_id))){
                        client.publish({
                            destination: `/app/view-message`,
                            body: JSON.stringify(action.payload.message.id),
                        });
                    }else if (action.payload.message.receiverId == user_id){
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
export const AddDirectConversation = ({conversation}) => {
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
        dispatch(slice.actions.setCurrentConversation(current_conversation));
        dispatch(slice.actions.setUnseenMessages({conversationId: current_conversation.id}));
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
                , user_id}));
        } else {
            /*dispatch(slice.actions.addUnreadMessagesCount({message}));*/
            dispatch(slice.actions.addUnreadMessagesCountInContactsByConversation(
                {
                    message: message,
                    contactId: message.contactId,
                    type: message.messageType
                , user_id }));
        }
    }
}

export function ClearConversation() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.resetState());

    };
}
