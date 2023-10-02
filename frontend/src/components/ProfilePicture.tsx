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
            let url = "";
            if (getUser() == null || id != getUser().id) {
                url = await getProfilePictureByUserId(id);
            }else{
                url = localStorage.getItem('profilePicture') + "";
            }
            console.log(url)
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