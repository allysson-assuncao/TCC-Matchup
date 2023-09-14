/*
import React, { useEffect, useState } from 'react';
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Grid, Button,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {getAllInterests} from "../../api/login_requests/register";
import {Interest} from "../../model/interest";

const SignUpStep3 = () => {
    const [interests, setInterests] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simule uma função de busca assíncrona (substitua por sua própria lógica)
                const response: Interest[] = await getAllInterests();
                setInterests(response); // Define os interesses quando a busca estiver completa
            } catch (error) {
                console.error('Erro ao buscar interesses', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Lógica para manipular os dados do formulário aqui
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Faça Cadastro
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container height={496} spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                fullWidth
                                id="tags-outlined"
                                options={interests}
                                getOptionLabel={(interest: Interest) => interest.name}
                                value={selectedInterests}
                                onChange={(_, newValue) => setSelectedInterests(newValue)}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField

                                        {...params}
                                        label="Interesses"
                                        placeholder="Selecione seus interesses"
                                        sx={{ minWidth: '420px' }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
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
                    {/!* Outros campos do formulário *!/}
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpStep3;
*/

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
import {Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Interest} from "../../model/interest";
import {getAllInterests} from "../../api/login_requests/register";
import logo from '../../img/logo-matchup3.png';

const SignUpStep3: React.FC = () => {
    const [notSelectedInterests, setNotSelectedInterests] = useState([]);
    const [interests, setSelectedInterests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simule uma função de busca assíncrona (substitua por sua própria lógica)
                const response: Interest[] = await getAllInterests();
                setNotSelectedInterests(response); // Define os interesses quando a busca estiver completa
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
                            {({field, form}) => (
                                <Autocomplete
                                    {...field}
                                    multiple
                                    fullWidth
                                    id="tags-outlined"
                                    name="interests"
                                    options={notSelectedInterests}
                                    getOptionLabel={(interest: Interest) => interest.name}
                                    onChange={(_, newValue) => form.setFieldValue('interests', newValue.map((interest) => interest.id))}
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

