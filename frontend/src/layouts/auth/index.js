import React from "react";
import {Container, Stack} from "@mui/material";
import {Navigate, Outlet, useNavigate} from "react-router-dom";

import Logo from "../../assets/Images/logo.ico";
import {useSelector} from "react-redux";
import {GameController} from "phosphor-react";
import {useTheme} from "@mui/material/styles";

const AuthLayout = () => {
    const theme = useTheme();
    const {isLoggedIn} = useSelector((state) => state.auth);
    const navigate = useNavigate();
/*
    if (isLoggedIn) {
        return <Navigate to={"/app"}/>;
    }*/

    return (
        <>
            <Container sx={{mt: 5}} maxWidth="sm"> {/*its limiting signup`s size*/}
                <Stack spacing={5}>
                    <Stack
                        sx={{width: "100%", cursor: "pointer"}}
                        direction="column"
                        alignItems={"center"}
                        onClick={() => navigate("/índice")}
                    >
                        <GameController size={96} color={theme.palette.primary.main} alt={"Logo"}/>
                    </Stack>
                    <Outlet/>
                </Stack>
            </Container>
        </>
    );
};

export default AuthLayout;
