import React, {useEffect, useState} from 'react';
import {
    FormControlLabel,
    Checkbox,
    Button,
    Avatar,
    Autocomplete,
    Grid,
    Container,
    CssBaseline,
    Box, TextField, Typography
} from '@mui/material';
import {Field, ErrorMessage, FieldProps, FormikProps} from 'formik';
import * as Yup from 'yup';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Interest} from "../../model/interest";
import {getAllInterests} from "../../api/login_requests/register";
import logo from '../../img/logo-matchup3.png';

const SignUpStep3: React.FC = () => {
    const [notSelectedInterests, setNotSelectedInterests] = useState<Interest[]>([]);
    const [interests, setSelectedInterests] = useState<Interest[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: Interest[] = await getAllInterests();
                setNotSelectedInterests(response);
            } catch (error) {
                console.error('Erro ao buscar interesses', error);
            }
        };

        fetchData();
    }, []);

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
                <img src={logo + ''} alt=""/>
                <Typography component="h1" variant="h5">
                    Faça Cadastro
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field name="interests">
                            {({field, form}:  { field: FieldProps, form: FormikProps<Interest> }) => (
                                <Autocomplete
                                    {...field}
                                    multiple
                                    fullWidth
                                    id="tags-outlined"
                                    options={notSelectedInterests}
                                    getOptionLabel={(interest: Interest) => interest.name}
                                    onChange={(_, newValue:Interest[]) => form.setFieldValue('interests', newValue.map((interest: Interest) => interest.id))}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Interesses"
                                            placeholder="Selecione seus interesses"
                                            sx={{minWidth: '420px'}}
                                        />
                                    )}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="interests" component="div"/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SignUpStep3;

