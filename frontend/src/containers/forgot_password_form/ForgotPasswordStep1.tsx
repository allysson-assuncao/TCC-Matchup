import * as React from 'react';
import {Container, Grid, Typography, TextField, CssBaseline, Box} from '@mui/material';
import {Field, FieldProps} from "formik";
import {validateForgotPasswordStep1} from "../../utils/validation/UserValidation";

const ForgotPasswordStep1: React.FC = () => {
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
                    Informe o email
                </Typography>
                <Field name="email">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoFocus
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

export default ForgotPasswordStep1;
