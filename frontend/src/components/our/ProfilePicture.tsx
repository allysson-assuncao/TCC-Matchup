import {useCustomTheme} from "../contexts/CustomThemeContext";
import * as React from "react";
import {useEffect, useState} from "react";
import {getProfilePictureByUserId} from "../api/user_requests/getUserBy";
import {Avatar, Grid} from "@mui/material";
import {useLoggedUser} from "../contexts/UserContext";

interface ProfilePictureProp {
    id: BigInt,
    small?: boolean
}

const ProfilePicture: React.FC<ProfilePictureProp> = ({id, small}) => {
    const {loggedUser} = useLoggedUser();
    const {theme: mode} = useCustomTheme();
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {


        async function fetchProfilePicture() {
            let url = "";
            if (!loggedUser || id != loggedUser.id) {
                console.log("id:" + id);
                url = small? await getProfilePictureByUserId(id, 96,96) : await getProfilePictureByUserId(id, 192, 192);
            }else{
                url = localStorage.getItem('profilePicture') + "";
            }
            setProfilePicture(url);
        }

        fetchProfilePicture();
    }, []);

    return (
        <Grid>
            {small && (
                <Avatar src={profilePicture}>

                </Avatar>
            )}
            {!small && (
                <Avatar sx={{width: '128px', height: '128px'}} src={profilePicture}>

                </Avatar>
            )}
        </Grid>
    );
}

export default ProfilePicture;