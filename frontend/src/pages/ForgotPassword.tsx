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
    Link, Snackbar
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ROUTE_SIGN_IN} from "../App";
import {useCustomTheme} from "../contexts/CustomThemeContext";
import getTheme from "../theme";
import {confirmEmail, updatePassword, verifyCode} from "../api/user_requests/forgot_password";
import {getUser} from "../App";
import {
    validateForgotPasswordStep1, validateForgotPasswordStep2, validateForgotPasswordStep3,
} from "../utils/validation/UserValidation";
import ForgotPasswordStep2 from "../containers/step_forms/forgot_password/ForgotPasswordStep2";
import ForgotPasswordStep3 from "../containers/step_forms/forgot_password/ForgotPasswordStep3";
import ForgotPasswordStep1 from "../containers/step_forms/forgot_password/ForgotPasswordStep1";
import {Form, Formik} from "formik";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

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
    const [id, setId] = useState(BigInt(0));
    const [formValues, setFormValues] = useState({
        email: '',
        code: '',
        rawPassword: '',
        confirmPassword: '',
    });

    const closeSnackbar = () => {
        setOpen(false);
    };

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
                let tempId = BigInt(await confirmEmail(values.email));
                if (!tempId) {
                    setOpen(true);
                    setMessage('Email inválido!');
                } else {
                    setId(tempId);
                    handleNext();
                }
            } else if (activeStep === 1) {
                console.log("code: " + values.code);
                // @ts-ignore
                let valid = await verifyCode(values.code, id);
                if (!valid) {
                    setOpen(true);
                    setMessage('Código inválido!');
                } else {
                    handleNext();
                }
            }
        } else {
            console.log("updatePassword");
            let valid = await updatePassword(id, values.rawPassword);
            if (!valid) {
                setOpen(true);
                setMessage('Deu erro vei!');
            }
            actions.setSubmitting(false);
            history(ROUTE_SIGN_IN);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <ForgotPasswordStep1/>;
            case 1:
                return <ForgotPasswordStep2/>;
            case 2:
                return <ForgotPasswordStep3/>;
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
                            email: 'henrique.lp2006@gmail.com',
                            code: '',
                            rawPassword: 'Senha123#',
                            confirmPassword: 'Senha123#',
                        }}
                        validationSchema={getValidationSchema(activeStep)}
                        onSubmit={(values, actions) => handleSubmit(values, actions)}
                    >
                        {(formikProps) => (
                            <Form>
                                {getStepContent(activeStep)}
                                <Grid sx={{display: 'flex'}} justifyContent={"space-between"}>
                                    {activeStep === 0 && (
                                        <Button color={"primary"} onClick={() => history(-1)} sx={{mt: 3, ml: 1}}>
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
                                        sx={{mt: 3, ml: 1}}
                                        type="submit"
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
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </Container>
        </React.Fragment>
    );
}

export default ForgotPassword;
