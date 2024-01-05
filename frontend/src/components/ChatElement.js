import React from "react";
import {Box, Badge, Stack, Avatar, Typography} from "@mui/material";
import {styled, useTheme, alpha} from "@mui/material/styles";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SelectConversation} from "../redux/slices/app";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";

const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({theme}) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

const StyledBadge = styled(Badge)(({theme}) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

function formatData(dateString) {
    let date = new Date(dateString);
    let now = new Date();
    let difference = now - date;

    if (difference < 24 * 60 * 60 * 1000) {
        return date.getHours() + ':' + date.getMinutes();
    } else if (difference < 7 * 24 * 60 * 60 * 1000) {
        return ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][date.getDay()];
    } else {
        let weeks = Math.floor(difference / (7 * 24 * 60 * 60 * 1000));
        let months = Math.floor(difference / (30 * 24 * 60 * 60 * 1000));
        let years = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));

        if (years > 0) {
            return years + ' anos atrás';
        } else if (months > 0) {
            return months + ' meses atrás';
        } else {
            return weeks + ' semanas atrás';
        }
    }
}

const ChatElement = ({img, name, msg, time, unread, online, id}) => {
    const dispatch = useDispatch();
    const {room_id} = useSelector((state) => state.app);
    const selectedChatId = room_id?.toString();

    let isSelected = +selectedChatId === id;

    if (!selectedChatId) {
        isSelected = false;
    }

    const theme = useTheme();

    return (
        <StyledChatBox
            onClick={() => {
                console.log(id);
                dispatch(SelectConversation({room_id: id}));

            }}
            sx={{
                width: "100%",

                borderRadius: 1,

                backgroundColor: isSelected
                    ? theme.palette.mode === "light"
                        ? alpha(theme.palette.primary.main, 0.5)
                        : theme.palette.primary.main
                    : theme.palette.mode === "light"
                        ? "#fff"
                        : theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2}>
                    {" "}
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                            variant="dot"
                        >
                            <Avatar alt={name} src={img}/>
                        </StyledBadge>
                    ) : (
                        <Avatar alt={name} src={img}/>
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption">{truncateText(msg, 20)}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    {/*<Typography sx={{fontWeight: 600}} variant="caption">
                        {time ? formatDistanceToNow(new Date(time), {
                            addSuffix: true,
                            locale: ptBR
                        }) :
                            (<></>)
                        }


                    </Typography>*/}
                    <Typography sx={{fontWeight: 600}} variant="caption">
                        {formatData(time)}
                    </Typography>
                    <Badge
                        className="unread-count"
                        color="primary"
                        badgeContent={unread}
                    />
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};

export default ChatElement;
