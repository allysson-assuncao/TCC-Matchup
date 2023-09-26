import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProfilePictureByUserId} from "../api/user_requests/getUserBy";
import {getUser} from "../pages/home/Home";
import {Avatar, Button, Grid} from "@mui/material";

interface ProfilePictureProp {
    id: BigInt,
    small?: boolean
}

const ProfilePicture: React.FC<ProfilePictureProp> = ({id, small}) => {
    const {theme: mode} = useCustomTheme();
    const [profilePicture, setProfilePicture] = useState('');
    /* myRef = React.createRef();

     componentDidMount() {
         if (this.myRef.current) {
             this.myRef.current.click();
         }
     }*/

    useEffect(() => {
        async function fetchProfilePicture() {
            const url = await getProfilePictureByUserId(id);
            console.log(url)
            setProfilePicture(url);
        }

        fetchProfilePicture();
    }, []);

    return (
        <Grid>
            {small && (
                <Avatar alt={getUser().name} src={profilePicture}>

                </Avatar>
            )}
            {!small && (
                <Avatar sx={{width: '128px', height: '128px'}} alt={getUser().name} src={profilePicture}>

                </Avatar>
            )}
        </Grid>
    );
}

export default ProfilePicture;