/*
import React from "react";
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
import {ROUTE_SIGN_IN} from "../../App";
import {DatePicker, DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {useFormik} from "formik";
import {User} from "../../model/user";

interface SignUpProps {
    user: User;
}
const SignUpStep2: React.FC<SignUpProps> = ({user}) => {
    var userToRegister = {user}.user;
    /!*const formik = useFormik({
        initialValues: {
            zipcode: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
        },

    };*!/



const minDate = dayjs().subtract(120, 'year').toDate();
const maxDate = dayjs().subtract(13, 'year').toDate();

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

};

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
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
                <h1>{user.name}</h1>
            </Avatar>
            <Typography component="h1" variant="h5">
                Faça Cadastro
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-zipcode"
                            name="zipcode"
                            required
                            fullWidth
                            id="zipcode"
                            label="CEP"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-state"
                            name="state"
                            required
                            fullWidth
                            id="state"
                            label="Estado"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="city"
                            label="Cidade"
                            name="city"
                            autoComplete="city"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="neighborhood"
                            label="Bairro"
                            type="neighborhood"
                            id="neighborhood"
                            autoComplete="neighborhood"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="street"
                            label="Rua/Avenida"
                            type="street"
                            id="street"
                            autoComplete="street"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="number"
                            label="Número"
                            type="text"
                            id="number"
                            autoComplete="number"
                        />
                    </Grid>

                </Grid>
                <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <Grid item xs={12}>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Button onClick={handleBack} disabled={etapaAtual === 0}>Anterior</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={etapaAtual === 3 ? handleFinish : handleNext}
                                    variant="contained">
                                {etapaAtual === 3 ? 'Concluir' : 'Próximo'}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
);

};

export default SignUpStep2;
*/

import React from 'react';
import {
    Avatar,
    Box,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import {Field, ErrorMessage, FieldProps} from 'formik';
import * as Yup from 'yup';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import logo from '../../img/logo-matchup3.png';

const SignUpStep2: React.FC = () => {
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

                {/*
                private int addressNumber;
                private String addressStreet;
                private String addressNeighborhood;
                private String addressCity;
                private String addressState;
                private String addressZipcode;
                */}

                <Field name="addressZipcode">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="zipcode"
                            label="CEP"
                            autoFocus
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                        />
                    )}
                </Field>
                <Field name="addressState">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="Estado"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                        />
                    )}
                </Field>
                <Field name="addressCity">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="Cidade"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                        />
                    )}
                </Field>
                <Field name="addressNeighborhood">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="addressNeighborhood"
                            label="Bairro"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                        />
                    )}
                </Field>
                <Field name="addressStreet">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="addressStreet"
                            label="Rua / Avenida"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                        />
                    )}
                </Field>
                <Field name="addressNumber">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="addressNumber"
                            label="Número"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                        />
                    )}
                </Field>


            </Box>
        </Container>
    );
};

export default SignUpStep2;

