import React from 'react';
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
    Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Field, FieldProps} from 'formik';
import DatePickerField from "../../components/form/DatePickerField";
import logo from '../../img/logo-matchup3.png';


const SignUpStep1: React.FC = () => {
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
                {/*<Avatar sx={{m: 1, bgcolor: 'primary.main'}}>

                </Avatar>*/}
                <img src={logo+''} alt=""/>
                <Typography component="h1" variant="h5">
                    Faça Cadastro
                </Typography>

                <Grid container spacing={2}>
                    <Grid item>
                        <Field name="name">
                            {({field, meta}: FieldProps) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    autoFocus
                                    variant="outlined"
                                    error={(meta.touched && !!meta.error)}
                                    helperText={(meta.touched && meta.error)}
                                />
                            )}
                        </Field>
                        <Field name="username">
                            {({field, meta}: FieldProps) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Nome de Usuário"
                                    variant="outlined"
                                    error={(meta.touched && !!meta.error)}
                                    helperText={(meta.touched && meta.error)}
                                />
                            )}
                        </Field>
                        <Field name="email">
                            {({field, meta}: FieldProps) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoComplete="email"
                                    variant="outlined"
                                    error={(meta.touched && !!meta.error)}
                                    helperText={(meta.touched && meta.error)}
                                />
                            )}
                        </Field>
                        <Field name="rawPassword">
                            {({field, meta}: FieldProps) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="rawPassword"
                                    label="Senha"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    error={(meta.touched && !!meta.error)}
                                    helperText={(meta.touched && meta.error)}
                                />
                            )}
                        </Field>
                        <Field name="confirmPassword">
                            {({field, meta}: FieldProps) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar Senha"
                                    type="password"
                                    autoComplete="new-password"
                                    variant="outlined"
                                    error={(meta.touched && !!meta.error)}
                                    helperText={(meta.touched && meta.error)}
                                />
                            )}
                        </Field>
                    </Grid>

                    <Grid item xs={12}>
                        <Field name="birthDate">
                            {({field, form, meta}: FieldProps) => (
                                <DatePickerField
                                    field={field}
                                    form={form}
                                    sx={{width: '100%'}}
                                    id="birthDate"
                                    label="Data de Nascimento"
                                    error={(meta.touched && !!meta.error)}
                                    helperText={(meta.touched && meta.error)}
                                />
                            )}
                        </Field>
                    </Grid>

                    {/*<Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary"/>}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>*/}
                </Grid>
            </Box>
        </Container>

    );
};
export default SignUpStep1;
