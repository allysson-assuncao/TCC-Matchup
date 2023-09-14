import React, {useState} from 'react';
import {Container, CssBaseline, Typography, Stepper, Step, StepLabel, Button, Grid, Box, Link} from '@mui/material';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import SignUpStep1 from "../../containers/form/SignUpStep1";
import SignUpStep2 from "../../containers/form/SignUpStep2";
import SignUpStep4 from "../../containers/form/SignUpStep4";
import SignUpStep3 from "../../containers/form/SignUpStep3";
import {Interest} from "../../model/interest";
import {register} from "../../api/login_requests/register";
import {useNavigate} from "react-router-dom";
import {ROUTE_HOME, ROUTE_SIGN_IN, ROUTE_SIGN_UP} from "../../App";
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

const steps = ['Pessoais', 'Endereço', 'Interesses', 'Conclusão'];

const SignUp: React.FC = () => {
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
        cellphoneNumber: '',
        bio: '',

    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = (values: any, actions: any) => {
        setFormValues({...formValues, ...values});

        if (activeStep < steps.length - 1) {
            handleNext();
        } else {
            const formattedBirthDate = format(Date.parse(formValues.birthDate), 'yyyy-MM-dd');
            formValues.birthDate = formattedBirthDate;
            console.log(formValues);

            let user = register({user: formValues});
            actions.setSubmitting(false);
            localStorage.setItem('user', JSON.stringify(user));
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
                return <SignUpStep4/>;
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
            case 3:
                return validateSignUpStep4;
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
                        /*initialValues={{
                            name: '',
                            username: 'Jorge1959',
                            email: '',
                            rawPassword: 'jorge123',
                            confirmPassword: 'jorge123',
                            birthDate: '',
                            addressZipcode: 36444555,
                            addressState: 'qweqweweq',
                            addressCity: 'qweqweqwe',
                            addressNeighborhood: 'qweeqwqwe',
                            addressStreet: 'weqweqwe',
                            addressNumber: 50,
                            cellphoneNumber: '381763734',
                            bio: 'aaaaaaaaaaaaaaa',
                        }}*/
                        initialValues={{
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
                        }}
                        validationSchema={getValidationSchema(activeStep)}
                        validateOnBlur={true}

                        onSubmit={(values, actions) => handleSubmit(values, actions)}
                    >
                        {(formikProps) => (
                            <Form>

                                <Grid item>{getStepContent(activeStep)}</Grid>
                                <Grid container justifyContent="space-between" sx={{marginTop: '20px'}}>
                                    <Grid item>
                                        {activeStep !== 0 && (
                                            <Button variant="text" color="primary" onClick={handleBack}>
                                                Voltar
                                            </Button>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={!formikProps.isValid}
                                            //onClick={activeStep === steps.length - 1 ? undefined : handleNext}
                                        >
                                            {activeStep === steps.length - 1 ? 'Cadastrar' : 'Próximo'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
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
                </Grid>
            </Box>
        </Grid>
    )
        ;
};

export default SignUp;


