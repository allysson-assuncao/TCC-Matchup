import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft, Circle, Prohibit, Trash} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingButton} from "@mui/lab";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";

import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import {ROUTE_LOGIN} from "../../../routes";
import {Block, showSnackbar, Unblock} from "../../../redux/slices/app";
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
        dispatch(Block(user.id, profile.id));

        setProfile((prevProfile) => ({
            ...prevProfile,
            doesFriendshipExist: false,
            blockedByMe: true,
            friendshipStatus: FRIENDSHIP_STATUS.ENDED
        }));
    }

    useEffect(() => {
        console.log(profile);
    },[])

    const unblock = () => {
        dispatch(showSnackbar({severity: 'success', message: 'Desbloqueado com sucesso!'}));

        dispatch(Unblock(user.id, profile.id));
        setProfile((prevProfile) => ({...prevProfile, blockedByMe: false}));
    }

    return (
        <>

            <Stack direction="row" alignItems={"center"}>
                <Button
                    onClick={() => {
                        profile.blockedByMe ? unblock() : block();
                    }}
                    title={profile.blockedByMe ? "Desbloquear" : "Bloquear"}
                    fullWidth
                    startIcon={profile.blockedByMe ? <Circle/> : <Prohibit/>}
                    variant="outlined"
                />

            </Stack>
        </>
    );
};

export default BlockButtons;
