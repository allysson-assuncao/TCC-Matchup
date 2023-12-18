import React from "react";
import {Button, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {client} from "../../../socket";

import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import {showSnackbar} from "../../../redux/slices/app";
import {Check, Close} from "@mui/icons-material";

const FriendshipResponseButtons = ({notification}) => {
    const theme = useTheme();
    const {user} = useSelector((state) => state.app);
    const {isLoggedIn, user_id} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

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

    const acceptFriendship = () => {
        dispatch(showSnackbar({severity: 'success', message: 'Amizade aceita!'}));

        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.ACCEPTED}))
    }

    const rejectFriendship = () => {
        dispatch(showSnackbar({severity: 'success', message: 'Amizade recusada!'}));

        setProfile((prevProfile) => ({...prevProfile, friendshipStatus: FRIENDSHIP_STATUS.REJECTED}))
    }

    return (
        <>
            <Stack direction="row" alignItems={"center"} spacing={2}>
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                        <Button
                            onClick={() => {
                                acceptFriendship()
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
                                rejectFriendship()
                            }}
                            title={"Recusar solicitação de amizade"}
                            fullWidth
                            startIcon={<Close/>}
                            variant="outlined"
                        >
                            Recusar
                        </Button>
                    </Stack>
            </Stack>
        </>
    );
};

export default FriendshipResponseButtons;
