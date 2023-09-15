import * as React from 'react';
import {Container, Paper, Toolbar, AppBar, CssBaseline, Typography, Stepper, Step, StepLabel, Button, Grid, Box, Link} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ForgotPasswordStepl1 from "../../containers/forgot_password_form/ForgotPasswordStep1";
import ForgotPasswordStepl2 from "../../containers/forgot_password_form/ForgotPasswordStep2";
import ForgotPasswordStepl3 from "../../containers/forgot_password_form/ForgotPasswordStep3";
import { Link as RouterLink } from 'react-router-dom';
import {ROUTE_SIGN_IN} from "../../App";

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
    const history = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
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

    const handleSubmit = (values: any, actions: any) => {
        setFormValues({...formValues, ...values});

        if (activeStep < steps.length - 1) {
            handleNext();
        } else {
            //verify stuff
            history(ROUTE_SIGN_IN);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <ForgotPasswordStepl1 />;
            case 1:
                return <ForgotPasswordStepl2 />;
            case 2:
                return <ForgotPasswordStepl3 />;
            default:
                return 'Erro: Etapa desconhecida';
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Redefinição de Senha
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Senha redefinida com sucesso!
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Grid sx={{ display: 'flex'}} justifyContent={"space-between"}>
                                {activeStep === 0 && (
                                    <Button component={RouterLink} to={ROUTE_SIGN_IN} sx={{ mt: 3, ml: 1 }}>
                                        Voltar
                                    </Button>
                                )}
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Voltar
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Redefinir' : 'Próximo'}
                                </Button>
                            </Grid>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}

export default ForgotPassword;
