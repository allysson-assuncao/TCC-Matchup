import React from "react";
import {Container, Stack} from "@mui/material";
import {Navigate, Outlet, useNavigate} from "react-router-dom";

import Logo from "../../assets/Images/logo.ico";
import {useSelector} from "react-redux";

const AuthLayout = () => {
    const {isLoggedIn} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (isLoggedIn) {
        return <Navigate to={"/app"}/>;
    }

    return (
        <>
            <Container sx={{mt: 5}} maxWidth="sm">
                <Stack spacing={5}>
                    <Stack
                        sx={{width: "100%", cursor: "pointer"}}
                        direction="column"
                        alignItems={"center"}
                        onClick={() => navigate("/índice")}
                    >
                        <img
                            style={{height: 96, width: 96}} src={Logo} alt="Logo"/>
                    </Stack>
                    <Outlet/>
                </Stack>
            </Container>
        </>
    );
};

export default AuthLayout;
