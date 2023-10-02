import React, {useState} from 'react';
import {Container, CssBaseline, Typography, Stepper, Step, StepLabel, Button, Grid, Box, Link} from '@mui/material';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import SignUpStep1 from "../../containers/form/SignUpStep1";
import SignUpStep2 from "../../containers/form/SignUpStep2";
import SignUpStep4 from "../../containers/form/SignUpStep4";
import SignUpStep3 from "../../containers/form/SignUpStep3";
import {Interest} from "../../model/interest";
import {register} from "../../api/user_requests/register";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ROUTE_HOME, ROUTE_INDEX, ROUTE_SIGN_IN} from "../../App";
import {User} from "../../model/user";
import {string} from "yup";
import {format} from 'date-fns';
import {
    validateSignUpStep1,
    validateSignUpStep2,
    validateSignUpStep3,
    validateSignUpStep4
} from "../../utils/validation/UserValidation";
import GoogleIcon from '@mui/icons-material/Google';
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {getUser, setUser} from "../home/Home";
import GeneralInfo from "../../components/Options/GeneralInfo";
import GeneralInfoRegister from "../../components/Options/GeneralInfoRegister";

const steps = ['Pessoais', 'Endereço', 'Interesses', 'Conclusão'];

const SignUp: React.FC = () => {
    const {theme: mode} = useCustomTheme();
    const theme = getTheme(mode);
    const history = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        email: '',
        rawPassword: '',
        birthDate: '',
        addressZipcode: 0,
        addressState: '',
        addressCity: '',
        addressNeighborhood: '',
        addressStreet: '',
        addressNumber: 0,
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async (values: any, actions: any) => {
        setFormValues({...formValues, ...values});

        if (activeStep < steps.length - 2) {
            handleNext();
        } else if (activeStep == steps.length - 2) {
            values.birthDate = format(Date.parse(values.birthDate), 'yyyy-MM-dd');
            console.log(values.rawPassword);
            let user = await register(values);

            console.log(user);
            actions.setSubmitting(false);
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(user));
            setUser();
            console.log(localStorage.getItem('user'));

            handleNext();
        } else if (activeStep == steps.length - 1) {
            history(ROUTE_HOME);

        }

    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <SignUpStep1/>;
            case 1:
                return <SignUpStep2/>;
            case 2:
                return <SignUpStep3/>;
            case 3:
                return <GeneralInfoRegister/>;
            default:
                return 'Erro: Etapa desconhecida';
        }
    };

    const getValidationSchema = (step: number) => {
        switch (step) {
            case 0:
                return validateSignUpStep1;
            case 1:
                return validateSignUpStep2;
            case 2:
                return validateSignUpStep3;
            default:
                return 'Erro: Etapa desconhecida';
        }
    };

    return (
        <Grid container justifyContent="center">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Formik
                        initialValues={{
                            name: '',
                            username: '',
                            email: '@gmail.com',
                            rawPassword: 'Senha123#',
                            confirmPassword: 'Senha123#',
                            //birthDate: '',
                            addressZipcode: '36492332',
                            addressState: '',
                            addressCity: '',
                            addressNeighborhood: '',
                            addressStreet: '',
                            addressNumber: 999,
                        }}
                        /*initialValues={{
                            name: '',
                            username: '',
                            email: '',
                            rawPassword: '',
                            confirmPassword: '',
                            birthDate: '',
                            addressZipcode: '',
                            addressState: '',
                            addressCity: '',
                            addressNeighborhood: '',
                            addressStreet: '',
                            addressNumber: null,
                            cellphoneNumber: '',
                            bio: '',
                        }}*/
                        validationSchema={getValidationSchema(activeStep)}
                        validateOnBlur={true}

                        onSubmit={(values, actions) => handleSubmit(values, actions)}
                    >
                        {(formikProps) => (
                            <Form>

                                <Grid item>{getStepContent(activeStep)}</Grid>
                                <Grid container justifyContent="space-between" sx={{marginTop: '20px'}}>
                                    {(activeStep !== 3) && (
                                        <Grid item>
                                            <Button
                                                onClick={activeStep !== 0 ? handleBack : () => history(-1)}
                                            >
                                                Voltar
                                            </Button>
                                        )}


                                    </Grid>
                                    {activeStep !== 4 && (
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={!formikProps.isValid}
                                                //onClick={activeStep === steps.length - 1 ? undefined : handleNext}
                                            >
                                                {activeStep === steps.length - 2 ? 'Cadastrar' : 'Próximo'}
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                    {activeStep !== 3 && (
                        <Grid container justifyContent={'center'}>
                            {/*<Grid item>
                            <Box display="flex" alignItems="center">
                                <GoogleIcon />
                                <Typography>oogle</Typography>
                            </Box>
                        </Grid>*/}
                            <Grid item>
                                <Link href={ROUTE_SIGN_IN} variant="body2">
                                    Já tem uma conta? Faça login
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Grid>
    )
        ;
};

export default SignUp;
