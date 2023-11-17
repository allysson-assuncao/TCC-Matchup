import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    CssBaseline,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl, Dialog, DialogTitle, DialogActions, DialogContent,
} from '@mui/material';
import { Field, Form, Formik, FieldProps } from 'formik';
import {registerAll, registerInterestDependency} from "../api/interest_requests/registerInterest";
import {SubGenre} from "../model/interest/subGenre";
import {Platform} from "../model/interest/platform";
import {Genre} from "../model/interest/genre";
import {Language} from "../model/interest/language";
import {AgeRating} from "../model/interest/ageRating";

interface InterestFormValues {
    name: string;
    company: string;
    lowestPrice: number;
    highestPrice: number;
    dubbedLanguages: string[];
    subtitledLanguages: string[];
    ageRating: string;
    genres: string[];
    subgenres: string[];
    platforms: string[];
}

const INTEREST_DEPENDENCIES = ['company', 'language', 'age-rating', 'genre', 'subgenre', 'platform'];



const RegisterInterests: React.FC = () => {
    const [dropdownData, setDropdownData] = useState<{ [key: string]: any[] }>({});

    const [name, setName] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [lowestPrice, setLowestPrice] = useState<number | string>('');
    const [highestPrice, setHighestPrice] = useState<number | string>('');
    const [dubbedLanguages, setDubbedLanguages] = useState<Language[]>([]);
    const [subtitledLanguages, setSubtitledLanguages] = useState<Language[]>([]);
    const [ageRating, setAgeRating] = useState<AgeRating>('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [subgenres, setSubgenres] = useState<SubGenre[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);


    const loadDropdowns = async () => {
        try {
            const data: { [key: string]: any[] } = {};
            await Promise.all(
                INTEREST_DEPENDENCIES.map(async (type) => {
                    const response = await getAll(type);
                    data[type] = response.data;
                })
            );
            setDropdownData(data);
        } catch (error) {
            console.error('Error loading dropdowns:', error);
        }
    };

    useEffect(() => {
        loadDropdowns();
    }, []);

    const initialValues: InterestFormValues = {
        name: '',
        company: '',
        lowestPrice: 0,
        highestPrice: 0,
        dubbedLanguages: [],
        subtitledLanguages: [],
        ageRating: '',
        genres: [],
        subgenres: [],
        platforms: [],
    };

    interface RegisterCompanyProps {
        onCompanyRegistered: () => void;
    }



    const RegisterCompanyDialog: React.FC<RegisterCompanyProps> = ({ onCompanyRegistered }) => {
        const [open, setOpen] = useState(false);
        const [newCompanyName, setNewCompanyName] = useState('');

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleRegisterCompany = async () => {
            try {
                // Fazer a requisição para cadastrar a empresa com newCompanyName
                // ...

                // Após o cadastro, fechar o diálogo
                handleClose();

                // Atualizar a lista de empresas ou realizar outras ações necessárias
                onCompanyRegistered();
            } catch (error) {
                console.error('Erro ao cadastrar empresa:', error);
            }
        };

        return (
            <>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Cadastrar Nova Empresa
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Cadastrar Nova Empresa</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Nome da Empresa"
                            variant="outlined"
                            fullWidth
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleRegisterCompany} color="primary">
                            Cadastrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    const handleRegisterInterestDependency = async (type: string) => {

        if (!name) return;

        try {
            let obj = await registerInterestDependency(type, name);
            // Reload dropdown data after registration

            setDropdownData((prevData) => ({ ...prevData, [type]: response.data }));
        } catch (error) {
            console.error(`Error registering ${type}:`, error);
        }
    };

    const handleFormSubmit = async (values: InterestFormValues) => {
        try {
            await registerAll('interest', values);
            // Handle success, e.g., redirect or show a success message
        } catch (error) {
            console.error('Error registering interest:', error);
            // Handle error, e.g., show an error message
        }
    };

    /*const register = async (type: string, data: any) => {
        try {
            await axios.post(`http://localhost:8080/api/admin/register/${type}`, data);
        } catch (error) {
            throw new Error(`Error registering ${type}: ${error}`);
        }
    };

    const getAll = async (type: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/get/${type}/all`);
            return response.data;
        } catch (error) {
            throw new Error(`Error getting ${type}s: ${error}`);
        }
    };*/

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Cadastrar Interesses
                </Typography>
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Field name="name">
                                    {({ field }: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Nome do jogo..."
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="company">
                                    {({ field }: FieldProps) => (
                                        <FormControl fullWidth variant="outlined" required>
                                            <InputLabel htmlFor="company">Empresas:</InputLabel>
                                            <Select {...field} label="Empresas">
                                                {dropdownData['company']?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <RegisterCompanyDialog onCompanyRegistered={loadDropdowns} />
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="lowestPrice">
                                    {({ field }: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            label="Menor preço"
                                            inputProps={{ min: 0, step: 0.01 }}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="highestPrice">
                                    {({ field }: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            label="Maior preço"
                                            inputProps={{ min: 0, step: 0.01 }}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="dubbedLanguages">
                                    {({ field }: FieldProps) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="dubbedLanguages">Dublado:</InputLabel>
                                            <Select {...field} label="Dublado" multiple>
                                                {dropdownData['language']?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="subtitledLanguages">
                                    {({ field }: FieldProps) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="subtitledLanguages">Legendado:</InputLabel>
                                            <Select {...field} label="Legendado" multiple>
                                                {dropdownData['language']?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="ageRating">
                                    {({ field }: FieldProps) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="ageRating">Idade:</InputLabel>
                                            <Select {...field} label="Idade">
                                                {dropdownData['age-rating']?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>

                            <Grid item xs={12}>
                                <Field name="genres">
                                    {({ field }: FieldProps) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="genres">Gênero(s):</InputLabel>
                                            <Select {...field} label="Gênero(s)" multiple>
                                                {genres?.map((item) => (
                                                    <MenuItem key={Number(item.id)} value={item.name}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button onClick={() => handleRegisterInterestDependency('genre')}>Cadastrar</Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Field name="subgenres">
                                    {({ field }: FieldProps) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="subgenres">Subgênero(s):</InputLabel>
                                            <Select {...field} label="Subgênero(s)" multiple>
                                                {dropdownData['subgenre']?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button onClick={() => handleRegisterInterestDependency('subgenre')}>Cadastrar</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="platforms">
                                    {({ field }: FieldProps) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="platforms">Plataforma(s):</InputLabel>
                                            <Select {...field} label="Plataforma(s)" multiple>
                                                {dropdownData['platform']?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button onClick={() => handleRegisterInterestDependency('platform')}>Cadastrar</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    ENVIAR
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Container>
    );
};

export default RegisterInterests;
