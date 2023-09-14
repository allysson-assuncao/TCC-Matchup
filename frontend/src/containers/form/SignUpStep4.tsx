import React, {useState} from "react";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Link,
    Alert, CardHeader,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputMask from 'react-input-mask';
import {Field, FieldProps} from "formik";
import logo from '../../img/logo-matchup3.png';

const SignUpStep4:  React.FC = () => {
    //const [value, setValue] = useState();
    /*const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validateSignUpStep1, // Use o esquema Yup aqui
        onSubmit: (values) => {
            console.log(values); // Lógica de envio do formulário
        },
    });*/


    /*
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

        };
    */

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src={logo+''} alt=""/>
                <Typography component="h1" variant="h5">
                    Faça Cadastro
                </Typography>
                <Field name="cellphoneNumber">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="cellphoneNumber"
                            name="cellphoneNumber"
                            label="Número de Celular (Opcional)"
                            autoFocus
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                        />
                    )}
                </Field>
                <Field name="bio">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="bio"
                            name="bio"
                            label="Bio (Opcional)"
                            variant="outlined"
                            multiline
                            rows={15}
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                        />
                    )}
                </Field>
                <div style={{marginTop: '30px'}}></div>
            </Box>
        </Container>
    );

};

export default SignUpStep4;