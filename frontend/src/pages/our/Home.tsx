/*import {ROUTE_PROFILE, ROUTE_SIGN_IN} from "../../App";*/
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppBarHome from "../../containers/appbars/AppBarHome";
import {getProfilePictureByUserId} from "../../api/user_requests/getUserBy";
import {useDispatch, useSelector} from "react-redux";

export const removeProfilePicture = () => {
    localStorage.removeItem('profilePicture');
}

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state: any) => state.app);
    const dispatch = useDispatch();
    const [profileRoute, setProfileRoute] = useState("profile");

    useEffect(() => {
        const userJSON = localStorage.getItem('user');
        if (!user) {
            navigate("login");
        } else {
            /*const user = JSON.parse(userJSON);
            setLoggedUser(user);*/
            setProfileRoute(`/perfil/${user?.username}`);
        }
    }, []);

    async function profilePictureTest(){
        localStorage.setItem("profilePicture", await getProfilePictureByUserId(user ? user?.id : BigInt(-1), 800, 800));
    }

    /*setUser();*/

    profilePictureTest();
    /*if (!loggedUser) return null;*/

    return (
        <AppBarHome></AppBarHome>


        /*<Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                /!*sx={{
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
                }}*!/
            >
                {/!*!//<Avatar  src='/src/assets/brand/logo-matchup.jpeg'/>*!/}

                {/!*<Typography component="h1" variant="h5">
                    Eae {loggedUser.name}
                </Typography>*!/}

            </Box>
        </Container>*/
    )

}

export default Home;
