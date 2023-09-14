import {
    Alert,
    Box,
    Button,
    Checkbox, Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import theme from "../../theme";
import {Field, FieldProps, Form, Formik} from "formik";
import {validationLogin} from "../../utils/validation/UserValidation";
import {ROUTE_SIGN_UP} from "../../App";
import React from "react";


const Home = () => {
    return(
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
                {/*//<Avatar  src='/src/assets/brand/logo-matchup.jpeg'/>*/}

                <Typography component="h1" variant="h5">
                    Fazer Login
                </Typography>

            </Box>
        </Container>
    )

}

export default Home;