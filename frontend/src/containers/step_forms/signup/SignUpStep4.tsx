import React, {} from "react";
import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
} from '@mui/material';
import {Field, FieldProps} from "formik";
/*import logo from '../../../img/logo-matchup3.png';*/

function formatPhoneNumber(value: any) {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 2) {
        return `(${onlyNums}`;
    }
    if (onlyNums.length <= 6) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
    if (onlyNums.length <= 10) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7)}`;
    }
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`;
}

const SignUpStep4:  React.FC = () => {
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
                {/*<img src={logo+''} alt=""/>*/}
                <Typography component="h1" variant="h5">
                    Faça Cadastro
                </Typography>
                <Field name="cellphoneNumber">
                    {({ field, meta, form }: FieldProps) => (
                        <TextField
                            {...field}
                            onChange={e => {
                                const formatted = formatPhoneNumber(e.target.value);
                                form.setFieldValue(field.name, formatted);
                            }}
                            margin="normal"
                            fullWidth
                            id="cellphoneNumber"
                            name="cellphoneNumber"
                            label="Número de Celular (Opcional)"
                            autoFocus
                            variant="outlined"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                        />
                    )}
                </Field>
                <Field name="bio">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
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