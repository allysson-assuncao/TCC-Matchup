import React from "react";
import {IconButton, Grid, Typography} from "@mui/material";
import ProfilePicture from "../ProfilePicture";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {ChatBubble, Clear} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {ROUTE_PROFILE} from "../../App";

export const NOTIFICATION_TYPES = {
    DEFAULT: 'DEFAULT',
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
}

export const SOLICITATION_TEXT = {
    PENDING: ` te enviou um pedido de amizade`,
    ACCEPTED: ' aceitou seu pedido de amizade',
    REJECTED: 'negou seu pedido de amizade'
}

interface FriendComponentProps {
    id: bigint;
    username: string;
}

const FriendComponent: React.FC<FriendComponentProps> = ({id, username}) => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();

    return (
        <Grid bgcolor={theme.palette.background.default} container>
            <Grid item>
                <ProfilePicture id={id} small/>
            </Grid>
            <Grid alignItems="center" item>
                <Typography color={theme.palette.text.primary}>
                    {username &&
                        <b style={{cursor: 'pointer'}}
                           onClick={() => history(`${ROUTE_PROFILE}/${username}`)}>{username}</b>
                    }
                </Typography>
            </Grid>
            <Grid item>
                    <IconButton
                        onClick={() => {
                            //redirect user to its temporary contact
                        }}
                    >
                        <ChatBubble color="success"></ChatBubble>
                    </IconButton>
            </Grid>

        </Grid>
    );
}

export default FriendComponent;
