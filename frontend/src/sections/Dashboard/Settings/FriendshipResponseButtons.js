import React from "react";
import {Button, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {client} from "../../../socket";

import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import {RespondFriendshipSolicitation, showSnackbar} from "../../../redux/slices/app";
import {Check, Close} from "@mui/icons-material";

const FriendshipResponseButtons = ({notification}) => {
    const theme = useTheme();
    const {user} = useSelector((state) => state.app);
    const {isLoggedIn, user_id} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const respondFriendshipSolicitation = (accepted) => {
        dispatch(showSnackbar({severity: 'success', message: accepted ? 'Amizade aceita!' : 'Amizade recusada!'}));
        dispatch(RespondFriendshipSolicitation(user.id, notification.senderId, accepted))
    }

    return (
        <>
            <Stack direction="row" alignItems={"center"} spacing={2}>
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
                        </Button>
                    </Stack>
            </Stack>
        </>
    );
};

export default FriendshipResponseButtons;
