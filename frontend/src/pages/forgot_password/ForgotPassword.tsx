import * as React from 'react';
import {
    Container,
    Paper,
    Toolbar,
    AppBar,
    CssBaseline,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Grid,
    Box,
    Link, Snackbar
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Link as RouterLink} from 'react-router-dom';
import {ROUTE_SIGN_IN} from "../../App";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {confirmEmail, updatePassword, verifyCode} from "../../api/user_requests/forgot_password";
import {getUser} from "../home/Home";
import {
    validateForgotPasswordStep1, validateForgotPasswordStep2, validateForgotPasswordStep3,
} from "../../utils/validation/UserValidation";
import ForgotPasswordStep2 from "../../containers/forgot_password_form/ForgotPasswordStep2";
import ForgotPasswordStep3 from "../../containers/forgot_password_form/ForgotPasswordStep3";
import ForgotPasswordStep1 from "../../containers/forgot_password_form/ForgotPasswordStep1";
import {Form, Formik} from "formik";
import {string} from "yup";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Matchup
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Validação do email', 'Código de verificação', 'Nova senha'];

const ForgotPassword: React.FC = () => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [formValues, setFormValues] = useState({
        email: '',
        code: '',
        rawPassword: '',
        confirmPassword: '',
    });

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = async (values: any, actions: any) => {
        setFormValues({...formValues, ...values});

        if (activeStep < steps.length - 1) {
            if (activeStep === 0) {
                let valid = await confirmEmail({email: values});
                if (valid) {
                    setOpen(true);
                    setMessage('Email inválido!');
                }
            } else if (activeStep === 1) {
                let user = getUser();
                let msg = await verifyCode({code: values, user: user});
                if (!msg) {
                    setOpen(true);
                    setMessage(msg);
                }
            }
            handleNext();
        } else {
            handleBack();
            let user = updatePassword({id: values, rawPassword: string});
            actions.setSubmitting(false);
            let userMemory = getUser();
            /*userMemory = user;*/
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(user));
            console.log(localStorage.getItem('user'));
            history(ROUTE_SIGN_IN);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <ForgotPasswordStep1/>;
            case 1:
                return <ForgotPasswordStep2 />;
            case 2:
                return <ForgotPasswordStep3 />;
            default:
                return 'Erro: Etapa desconhecida';
        }
    };

    const getValidationSchema = (step: number) => {
        switch (step) {
            case 0:
                return validateForgotPasswordStep1;
            case 1:
                return validateForgotPasswordStep2;
            case 2:
                return validateForgotPasswordStep3;
            default:
                return 'Erro: Etapa desconhecida';
        }
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{bgcolor: "background.default", my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography color={theme.palette.primary.main} component="h1" variant="h4" align="center">
                        Redefinição de Senha
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Formik
                        initialValues={{
                            email: '',
                            code: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={getValidationSchema(activeStep)}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <Form>
                                {getStepContent(activeStep)}
                                <Grid sx={{display: 'flex'}} justifyContent={"space-between"}>
                                    {activeStep === 0 && (
                                        <Button color={"primary"} component={RouterLink} to={ROUTE_SIGN_IN}
                                                sx={{mt: 3, ml: 1}}>
                                            Voltar
                                        </Button>
                                    )}
                                    {activeStep !== 0 && (
                                        <Button color={"primary"} onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Voltar
                                        </Button>
                                    )}

                                    <Button
                                        color={"primary"}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        {activeStep === steps.length - 1 ? 'Redefinir' : 'Próximo'}
                                    </Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
                <Copyright/>
                <Snackbar
                    open={open}
                    message={message}
                />
            </Container>
        </React.Fragment>
    );
}

export default ForgotPassword;
