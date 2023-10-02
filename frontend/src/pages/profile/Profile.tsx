import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Typography
} from "@mui/material";
import AppBarHome from "../../containers/AppBarHome";
import React, {useEffect, useState} from "react";
import logo from "../../img/logo-matchup3.png";
import {User} from "../../model/user";
import {getUser} from "../home/Home";
import theme from "../../theme";
import {ROUTE_SIGN_IN} from "../../App";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import AppBarProfile from "../../containers/AppBarProfile";
import {getProfilePictureByUserId, getUserByUsername} from "../../api/user_requests/getUserBy";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import ProfilePicture from "../../components/ProfilePicture";
import {id} from "date-fns/locale";

const Profile = () => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const {usernamePathVariable} = useParams();
    console.log(usernamePathVariable);
    const history: NavigateFunction = useNavigate();

    const [editable, setEditability] = useState(false);
    const [idProfile, setIdProfile] = useState(BigInt(0));
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState(undefined);
    const [bio, setBio] = useState(undefined);

    /*useEffect( () => {
            const userJSON = localStorage.getItem('user');
            if (!userJSON) {
                history(ROUTE_SIGN_IN);
            } else {
                let user;

                if (usernamePathVariable == JSON.parse(userJSON).username) {
                    setEditability(true);
                    user = JSON.parse(userJSON);
                }else{
                    user = getUserByUsername(usernamePathVariable);
                    setEditability(false);
                }
                setImage(user.profilePicture);
                setName(user.name);
                setBio(user.bio);
            }
        }, []
    );*/

    useEffect(() => {
        const fetchData = async () => {
            let userJSON = localStorage.getItem('user');

            let user;

            /*if (userJSON)/!*usuario esta logado?*!/ {
                if (usernamePathVariable == JSON.parse(userJSON).username) /!*o perfil acessado é o do usuário logado?*!/ {
                    setEditability(true);
                    user = JSON.parse(userJSON);
                }else {
                    console.log(usernamePathVariable);
                    user = await getUserByUsername(usernamePathVariable);
                    console.log(user.id);
                    setEditability(false);
                }
            } else {
                console.log(usernamePathVariable);
                user = await getUserByUsername(usernamePathVariable);
                console.log(user.id);
                setEditability(false);
            }
            /!*setImage(user.profilePicture);*!/
            setIdProfile(user.id);
            setName(user.name);
            setBio(user.bio);*/

            if (userJSON) {
                if (usernamePathVariable == JSON.parse(userJSON).username) {
                    user = JSON.parse(userJSON);
                } else {
                    user = await getUserByUsername(usernamePathVariable);
                }
                setEditability(usernamePathVariable == JSON.parse(userJSON).username);
            } else {
                user = await getUserByUsername(usernamePathVariable);
                setEditability(false);
            }

            setIdProfile(user.id);
            setName(user.name);
            setBio(user.bio);

        };

        fetchData();
    }, []);

    /*useEffect(() => {
        async function fetchProfilePicture() {
            const url = await getProfilePictureByUserId(getUser().id);
            setProfilePicture(url);
        }

        fetchProfilePicture();
    }, []);*/


    return (
        <React.Fragment>
            <AppBarProfile username={usernamePathVariable} editable={editable}></AppBarProfile>
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
                    <Typography color={theme.palette.primary.main} variant="h4">{name}</Typography>
                    {/*<Avatar alt={name} src={profilePicture} style={{width: '100px', height: '100px', cursor: 'pointer'}}/>*/}
                    {idProfile ? <ProfilePicture id={idProfile} small={false}></ProfilePicture> : null}
                    <Typography color={theme.palette.primary.main} variant="body1" align="left">{bio}</Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Profile;
