import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft, Prohibit, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingButton} from "@mui/lab";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";
import {client} from "../../../socket";

import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import {ROUTE_LOGIN} from "../../../routes";
import {RespondFriendshipSolicitation, showSnackbar} from "../../../redux/slices/app";
import {Check, Close, PersonRemove, Remove} from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {ClockIcon} from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";

const ProfileButtons = ({profile, setProfile}) => {
    const theme = useTheme();
    const {user} = useSelector((state) => state.app);
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
        //if (!client) return;
        console.log(client);
        client.publish({
            destination: `/app/send/friendship-solicitation`,
            body: JSON.stringify({senderId: user_id, receiverId: profile.id})
        });

        dispatch(showSnackbar({severity: 'success', message: 'Solicitação enviada!'}));
        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.SENT}))
    }


    const endFriendship = () => {
        dispatch(showSnackbar({severity: 'success', message: 'Amizade terminada!'}));

        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.ENDED}))
    }

    const respondFriendshipSolicitation = (accepted) => {
        dispatch(showSnackbar({severity: 'success', message: accepted ? 'Amizade aceita!' : 'Amizade recusada!'}));
        dispatch(RespondFriendshipSolicitation(user.id, profile.id, accepted))

        setProfile((prevProfile) => (
            {...prevProfile,
                friendshipStatus: accepted ? FRIENDSHIP_STATUS.ACCEPTED : FRIENDSHIP_STATUS.REJECTED
            }))
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
                        onClick={() => {
                            endFriendship()
                        }}
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
                            onClick={() => {
                                respondFriendshipSolicitation(true);
                            }}
                            title={"Aceitar solicitação de amizade"}
                            fullWidth
                            startIcon={<Check/>}
                            variant="outlined"
                        >
                            Aceitar
                        </Button>
                        <Button
                            onClick={() => {
                                respondFriendshipSolicitation(false);
                            }}
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
