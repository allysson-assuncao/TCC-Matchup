import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft, Prohibit, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingButton} from "@mui/lab";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";

import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import {ROUTE_LOGIN} from "../../../routes";
import {showSnackbar} from "../../../redux/slices/app";
import {Check, Close, PersonRemove, Remove} from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {ClockIcon} from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";

const ProfileButtons = ({profile, setProfile}) => {
    const theme = useTheme();
    const {user, client} = useSelector((state) => state.app);
    const {isLoggedIn, user_id} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /*snackbar: {
        open: null,
        severity: null,
        message: null,
    },*/

    const navigate = useNavigate();

    /*private long id;
    private String profilePicture;
    private String username;
    private String name;
    private String bio;
    private boolean isBlockedByMe;
    private boolean blockedMe;
    private boolean doesFriendshipExist;
    private String friendshipStatus;
    private List<String> interestNames;*/

    const sendFriendshipSolicitation = () => {
        const sendTextMessage = () => {
            if (!client) return;
            console.log(client);
            let ooo = client.publish({
                destination: `/send/friendship-solicitation`,
                body: {senderId: user_id, receiverId: profile.id}
            });
        }

        dispatch(showSnackbar({severity: 'success', message: 'Solicitação enviada!'}));


        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.SENT}))
    }

    const endFriendship = () => {
        const severity = 'success';
        const message = 'Amizade terminada!';
        dispatch(showSnackbar({severity, message}));

        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.ENDED}))
    }

    const acceptFriendship = () => {
        const severity = 'success';
        const message = 'Amizade aceita!';
        dispatch(showSnackbar({severity, message}));

        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.ACCEPTED}))
    }

    const rejectFriendship = () => {
        const severity = 'success';
        const message = 'Amizade recusada!';
        dispatch(showSnackbar({severity, message}));

        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.REJECTED}))
    }

    return (
        <>

            <Stack direction="row" alignItems={"center"} spacing={2}>
                {console.log(profile)}
                {(!profile.doesFriendshipExist || (profile.friendshipStatus != FRIENDSHIP_STATUS.PENDING && profile.friendshipStatus != FRIENDSHIP_STATUS.ACCEPTED)) && (
                    <Button
                        onClick={() => {
                            /*isLoggedIn ? sendFriendshipSolicitation() : navigate(ROUTE_LOGIN);*/
                            sendFriendshipSolicitation();
                        }}
                        disabled={profile.isBlockedByMe || profile.blockedMe || profile.friendshipStatus == FRIENDSHIP_STATUS.SENT}
                        title={profile.blockedMe ? `Você foi bloqueado por ${profile.username} :/` : "Enviar solicitação de amizade"}
                        fullWidth
                        startIcon={<PersonAddIcon/>}
                        variant="outlined"
                    >
                        Adicionar
                    </Button>
                )}
                {(profile.doesFriendshipExist && profile.friendshipStatus == FRIENDSHIP_STATUS.ACCEPTED) && (
                    <Button
                        onClick={() => {endFriendship()}}
                        title={"Remover Amizade"}
                        fullWidth
                        startIcon={<PersonRemove/>}
                        variant="outlined"
                    >
                        Remover
                    </Button>
                )}
                {(profile.doesFriendshipExist && profile.friendshipStatus == FRIENDSHIP_STATUS.PENDING) && (
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                        <Button
                            onClick={() => {acceptFriendship()}}
                            title={"Aceitar solicitação de amizade"}
                            fullWidth
                            startIcon={<Check/>}
                            variant="outlined"
                        >
                            Aceitar
                        </Button>
                        <Button
                            onClick={() => {rejectFriendship()}}
                            title={"Recusar solicitação de amizade"}
                            fullWidth
                            startIcon={<Close/>}
                            variant="outlined"
                        >
                            Recusar
                        </Button>
                    </Stack>

                )}
            </Stack>
        </>
    );
};

export default ProfileButtons;
