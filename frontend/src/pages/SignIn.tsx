import React, {useState} from 'react';
import {Formik, Form, Field, FieldProps, FormikHelpers} from 'formik';
import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Link,
    Alert,
} from '@mui/material';
import {emailExists, login, usernameExists, ValidationResponse} from '../api/user_requests/login';
import {SignInPayload, User} from '../model/user';
import {isEmail, validationLogin} from '../utils/validation/UserValidation';
import {useNavigate} from "react-router-dom";
import {getUser, ROUTE_FORGOT_PASSWORD, ROUTE_HOME, ROUTE_SIGN_UP} from "../App";
import logo from '../img/logo-matchup3.png';
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import {getProfilePictureByUserId} from "../api/user_requests/getUserBy";

import {Contact} from "../model/contact";
import {getContactsByUserId} from "../api/user_requests/contactRequests";

interface SignInProps {
    setContacts?: React.Dispatch<React.SetStateAction<Contact[] | null>>;
}

const SignIn: React.FC<SignInProps> = ({setContacts}) => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useNavigate();
    const [valid, setValid] = useState(true);

    const initialValues = {
        emailOrUsername: 'liceki',
        password: 'Senha123#',
        remember: false,
    };

    const fetchContacts = async () => {
        try {
            const fetchedContacts = await getContactsByUserId(getUser().id);
            if (setContacts) {
                setContacts(fetchedContacts);
            }
            return true;
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    let userData: User;
    const handleSubmit = async (values: SignInPayload, formikProps: FormikHelpers<SignInPayload>) => {
        if(!valid){
            return;
        }
        try {
            let validationResponse: ValidationResponse;

            if (isEmail) {
                validationResponse = await emailExists(values.emailOrUsername);
            } else {
                validationResponse = await usernameExists(values.emailOrUsername);
            }

            console.log(validationResponse);

            if (validationResponse.status === 409) {
                setValid(false);
                return;
            } else {
                userData = await login(isEmail, values.emailOrUsername, values.password, values.remember);
                console.log(userData);
            }
        } catch (error) {
            setValid(false);
            return;
        }

        formikProps.setSubmitting(false);
        setIsLoggedIn(true);
        localStorage.removeItem('user');
        localStorage.removeItem('profilePicture');
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData);
        localStorage.setItem("profilePicture", await getProfilePictureByUserId(getUser().id, 800, 800));
        history(ROUTE_HOME);
        fetchContacts();

    }


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
                    backgroundColor: '9c27b0',
                }}
            >
                <img src={logo+''} alt=""/>

                <Typography component="h1" variant="h5">
                    Fazer Login
                </Typography>
                <Alert
                    id="alert-invalid-credentials"
                    severity="error"
                    onClose={() => {
                        setValid(true);
                    }}
                    style={{display: valid ? 'none' : 'flex'}}
                >
                    Credenciais inválidas!
                </Alert>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationLogin}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}

                >
                    {(formikProps) => (
                        <Form noValidate>
                            <Field name="emailOrUsername">
                                {({field, meta}: FieldProps) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="emailOrUsername"
                                        label="Email ou Nome de Usuário"
                                        variant="outlined"
                                        error={!valid/*|| (meta.touched && !!meta.error)*/}
                                        //helperText={/*meta.touched && meta.error*/}
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {({field, meta}: FieldProps) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        error={!valid/*|| (meta.touched && !!meta.error)*/}
                                        //helperText={meta.touched && meta.error}
                                    />
                                )}
                            </Field>
                            <FormControlLabel
                                control={<Checkbox name="remember" color="primary"/>}
                                label="Manter conectado"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{mt: 3, mb: 2}}
                                disabled={!formikProps.isValid || formikProps.isSubmitting}
                            >
                                ENTRAR
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href={ROUTE_FORGOT_PASSWORD} variant="body2">
                                        Esqueceu a senha?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href={ROUTE_SIGN_UP} variant="body2">
                                        Não tem uma conta? Cadastre-se
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};


export default SignIn;

/*import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function SignIn() {
    const [messages, setMessages] = useState(Array.from({ length: 20 }, (_, i) => `Mensagem ${20 - i}`));

    const handleScroll = () => {
        if (window.pageYOffset === 0) {
            setMessages((prevMessages) => [`Nova mensagem ${prevMessages.length + 1}`, ...prevMessages]);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">Seu AppBar</Typography>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flex: '1 0 auto', mt: 8, mb: 8, overflow: 'auto' }}>
                <Paper>
                    <List>
                        {messages.map((message, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={message} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Typography variant="h6">Seu Rodapé</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}*/
