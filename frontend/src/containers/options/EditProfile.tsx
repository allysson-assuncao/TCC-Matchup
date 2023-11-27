import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {User} from "../../model/user";
import {ROUTE_SIGN_IN} from "../../App";
import {Box, Container, CssBaseline} from "@mui/material";
import AppBarGeneral from "../appbars/AppBarGeneral";
import GeneralInfo from "./GeneralInfo";
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import getTheme from "../../theme";


const Profile = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const {usernamePathVariable} = useParams();
    console.log(usernamePathVariable);
    const history: NavigateFunction = useNavigate();

    const [editable, setEditability] = useState(false);

    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [image, setImage] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [bio, setBio] = useState(undefined);

    useEffect(() => {
            const userJSON = localStorage.getItem('user');
            if (!userJSON) {
                history(ROUTE_SIGN_IN);
            } else {
                let user;
                user = JSON.parse(userJSON);
                if (usernamePathVariable == JSON.parse(userJSON).username) {
                    setEditability(true);
                }else{
                    setEditability(false);
                }
                setLoggedUser(user);
                setImage(user.profilePicture);
                setName(user.name);
                setBio(user.bio);
            }
        }, []
    );

    if (!loggedUser) return null;

    return (
        <React.Fragment>
            <AppBarGeneral title={"Configurações"}></AppBarGeneral>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 550,
                        minWidth: 450,
                        width: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: `1px solid${theme.palette.primary.main}`,
                        padding: '40px',
                        borderRadius: '16px',
                        backgroundColor: '9c27b0',
                    }}
                >
                    <GeneralInfo fromRegister={false}></GeneralInfo>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Profile;