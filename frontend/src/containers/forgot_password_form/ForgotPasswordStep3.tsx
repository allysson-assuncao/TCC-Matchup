import * as React from 'react';
import {Container, Button, Grid, Link, Typography, TextField, Box, CssBaseline} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import theme from "../../theme";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {Field, FieldProps} from "formik";

const ForgotPasswordStep3: React.FC = () => {
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
                <Typography component="h1" variant="h5">
                    Redefinição de Senha
                </Typography>
                <Field name="password">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            autoFocus
                            fullWidth
                            id="password"
                            label="Senha"
                            type="password"
                            variant="outlined"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
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
                            id="confirmPassword"
                            label="Confirme a Senha"
                            type="password"
                            variant="outlined"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                        />
                    )}
                </Field>
            </Box>
        </Container>
    );
};

export default ForgotPasswordStep3;
