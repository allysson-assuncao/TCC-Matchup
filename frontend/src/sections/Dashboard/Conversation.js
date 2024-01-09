import React from "react";
import {
    Stack,
    Box,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Divider,
} from "@mui/material";
import {useTheme, alpha} from "@mui/material/styles";
import {DotsThreeVertical, DownloadSimple, Image} from "phosphor-react";
import {Message_options} from "../../data";
import {Link} from "react-router-dom";
import truncateString from "../../utils/truncate";
import {LinkPreview} from "@dhaiwat10/react-link-preview";
import Embed from "react-embed";

function formatData(dateString) {
    let date = new Date(dateString);
    let now = new Date();
    let difference = now - date;

    if (difference < 24 * 60 * 60 * 1000) {
        if(date.getMinutes() < 10){
            return date.getHours() + ':0' + date.getMinutes();
        }
        return date.getHours() + ':' + date.getMinutes();
    } else if (difference < 7 * 24 * 60 * 60 * 1000) {
        return ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][date.getDay()];
    } else {
        let weeks = Math.floor(difference / (7 * 24 * 60 * 60 * 1000));
        let months = Math.floor(difference / (30 * 24 * 60 * 60 * 1000));
        let years = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));

        if (years > 0) {
            if(years = 1){
                return years + ' ano atrás';
            }
            return years + ' anos atrás';
        } else if (months > 0) {
            if(months = 1){
                return months + ' mês atrás';
            }
            return months + ' meses atrás';
        } else {
            if(weeks = 1){
                return weeks + ' semana atrás';
            }
            return weeks + ' semanas atrás';
        }
    }
}

const MessageOption = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <DotsThreeVertical
                size={20}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((el) => (
                        <MenuItem onClick={handleClose}>{el.title}</MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    );
};

const TextMsg = ({el, menu}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "flex-start" : "flex-end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Typography
                    variant="body2"
                    color={el.incoming ? theme.palette.text.primary : "#fff"}
                >
                    {el.text}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                        fontSize: "0.7rem",
                        textAlign: el.incoming ? "left" : "right",
                    }}
                >
                    {formatData(el.date)}
                </Typography>

            </Box>
            {menu && <MessageOption />}
        </Stack>
    );
};
const MediaMsg = ({el, menu}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={1}>
                    <img
                        src={el.img}
                        alt={el.text}
                        style={{maxHeight: 210, borderRadius: "10px"}}
                    />
                    <Typography
                        variant="body2"
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        {el.text}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};
const DocMsg = ({el, menu}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <Image size={48}/>
                        <Typography variant="caption">Abstract.png</Typography>
                        <IconButton>
                            <DownloadSimple/>
                        </IconButton>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        {el.text}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};
const LinkMsg = ({el, menu}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        spacing={3}
                        alignItems="start"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <Stack direction={"column"} spacing={2}>
                            <Embed
                                width="300px"
                                isDark
                                url={`https://youtu.be/xoWxBR34qLE`}
                            />
                        </Stack>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        <div dangerouslySetInnerHTML={{__html: el.text}}></div>
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};
const ReplyMsg = ({el, menu}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.paper, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: alpha(theme.palette.background.paper, 1),

                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body2" color={theme.palette.text}>
                            {el.text}
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={el.incoming ? theme.palette.text : "#fff"}
                    >
                        {el.reply}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};
const Timeline = ({el}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Divider width="46%"/>
            <Typography variant="caption" sx={{color: theme.palette.text}}>
                {el.text}
            </Typography>
            <Divider width="46%"/>
        </Stack>
    );
};

export {Timeline, MediaMsg, LinkMsg, DocMsg, TextMsg, ReplyMsg};
