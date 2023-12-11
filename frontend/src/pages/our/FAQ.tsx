import {
    Box,
    Container,
    CssBaseline,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCustomTheme} from "../contexts/CustomThemeContext";
import getTheme from "../theme";

const FAQ = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();

    return (
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
                }}
            >
                <Typography component="h1" variant="h5">
                    Sobre nós : )
                </Typography>
                {/*Put our social medias here, gitHub, linkedin...*/}
            </Box>
        </Container>
    );
}

export default FAQ;
