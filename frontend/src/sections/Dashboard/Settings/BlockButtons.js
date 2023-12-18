import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft, Circle, Prohibit, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingButton} from "@mui/lab";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";

import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import {ROUTE_LOGIN} from "../../../routes";
import {showSnackbar} from "../../../redux/slices/app";
import {Check, PersonRemove, Remove} from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const BlockButtons = ({profile, setProfile}) => {
    const theme = useTheme();
    const {user} = useSelector((state) => state.app);
    const {isLoggedIn} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const block = () => {
        dispatch(showSnackbar({severity: 'success', message: 'Bloqueado com sucesso!'}));


        setProfile((prevProfile) => ({
            ...prevProfile,
            doesFriendshipExist: false,
            isBlockedByMe: !prevProfile.isBlockedByMe,
            friendshipStatus: FRIENDSHIP_STATUS.ENDED
        }));
    }

    const unblock = () => {
        dispatch(showSnackbar({severity: 'success', message: 'Desbloqueado com sucesso!'}));


        setProfile((prevProfile) => ({...prevProfile, isBlockedByMe: !prevProfile.isBlockedByMe}));
    }

    return (
        <>

            <Stack direction="row" alignItems={"center"}>
                {console.log(profile)}
                <Button
                    onClick={() => {
                        profile.isBlockedByMe ? unblock() : block();
                    }}
                    title={profile.isBlockedByMe ? "Desbloquear" : "Bloquear"}
                    fullWidth
                    startIcon={profile.isBlockedByMe ? <Circle/> : <Prohibit/>}
                    variant="outlined"
                />

            </Stack>
        </>
    );
};

export default BlockButtons;
