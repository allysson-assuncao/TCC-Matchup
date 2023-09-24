import * as React from 'react';
import {Box, Container, CssBaseline, Grid, TextField, Typography} from '@mui/material';
import theme from "../../theme";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {Field, FieldProps} from "formik";

const ForgotPasswordStep2: React.FC = () => {
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
                <Field name="code">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="Código"
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

export default ForgotPasswordStep2;
