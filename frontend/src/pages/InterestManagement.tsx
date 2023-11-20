import React, {useEffect, useState} from 'react';
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
    FormControl,
} from '@mui/material';
import {Field, Form, Formik, FieldProps} from 'formik';
import {
    getAllInterestDependencies,
    registerAll,
} from "../api/interest_requests/registerInterest";
import {languages} from "../resources/languages";
import {InterestDependency} from "../model/interest";
import MultipleSelectFormik from "../components/fields/MultipleSelectFormik";
import AppBarProfile from "../containers/appbars/AppBarProfile";
import {getUser} from "./Home";
import MultipleSelect from "../components/fields/MultipleSelect";
import SimpleSelect from "../components/fields/SimpleSelect";

/*interface InterestFormValues {
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
}*/


const InterestManagement: React.FC = () => {
    const [name, setName] = useState<string>('');

    const [companies, setCompanies] = useState<InterestDependency[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<InterestDependency>();

    const [lowestPrice, setLowestPrice] = useState<number | string>('');
    const [highestPrice, setHighestPrice] = useState<number | string>('');

    const [dubbedLanguages, setDubbedLanguages] = useState<InterestDependency[]>(languages);
    const [selectedDubbedLanguages, setSelectedDubbedLanguages] = useState<InterestDependency[]>([]);

    const [subtitledLanguages, setSubtitledLanguages] = useState<InterestDependency[]>(languages);
    const [selectedSubtitledLanguages, setSelectedSubtitledLanguages] = useState<InterestDependency[]>([]);


    const [ageRatings, setAgeRatings] = useState<InterestDependency[]>();
    const [selectedAgeRating, setSelectedAgeRating] = useState<InterestDependency>();

    const [genres, setGenres] = useState<InterestDependency[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<InterestDependency[]>([]);

    const [subgenres, setSubgenres] = useState<InterestDependency[]>([]);
    const [selectedSubGenres, setSelectedSubGenres] = useState<InterestDependency[]>([]);

    const [platforms, setPlatforms] = useState<InterestDependency[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<InterestDependency[]>([]);

    //let dropDownLoader = [setCompany, setDubbedLanguages];

    const loadDropdowns = async () => {
        try {
            let data = await getAllInterestDependencies();
            setCompanies(data.companies);
            setAgeRatings(data.ageRatings);
            setGenres(data.genres);
            setSubgenres(data.subGenres);
            setPlatforms(data.platforms);

        } catch (error) {
            console.error('Error loading dropdowns:', error);
        }
    };

    useEffect(() => {
        loadDropdowns();
    }, []);




    return (
        <Container component="main" maxWidth="md">
            <AppBarProfile editable={true} blocked={false} username={getUser().username}
                           idProfile={getUser().id}></AppBarProfile>
            <CssBaseline/>
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Grid container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Field name="name">
                                {({field}: FieldProps) => (
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

                        {/*<Grid item xs={12}>
                            <SimpleSelect
                                setSelectedOption={setSelectedCompany}
                                selectedOption={selectedCompany}
                                options={companies}
                                label={"Empresas"}
                                placeholder={"Empresas"}
                                fieldName={"company"}
                            />
                        </Grid>*/}

                        <Grid item xs={6}>
                            <Field name="lowestPrice">
                                {({field}: FieldProps) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="number"
                                        label="Menor preço"
                                        inputProps={{min: 0, step: 0.01}}
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={6}>
                            <Field name="highestPrice">
                                {({field}: FieldProps) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="number"
                                        label="Maior preço"
                                        inputProps={{min: 0, step: 0.01}}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <MultipleSelect
                            fieldName={'dubbedLanguages'}
                            label={'Dublado'}
                            placeholder={'Selecione as linguagens dubladas:'}
                            options={dubbedLanguages}
                            selectedOptions={selectedDubbedLanguages}
                            setSelectedOptions={setSelectedDubbedLanguages}
                        />


                        <MultipleSelect
                            fieldName={'subtitledLanguages'}
                            label={'Legendado'}
                            placeholder={'Selecione as linguagens legendadas:'}
                            options={subtitledLanguages}
                            selectedOptions={selectedSubtitledLanguages}
                            setSelectedOptions={setSelectedSubtitledLanguages}
                        />

                       {/* <Grid item xs={12}>
                            <SimpleSelect
                                setSelectedOption={setSelectedAgeRating}
                                selectedOption={selectedAgeRating}
                                options={ageRatings}
                                label={"Classificação Indicativa"}
                                placeholder={"Classificação Indicativa:"}
                                fieldName={"ageRating"}
                            />
                        </Grid>*/}

                        <MultipleSelect
                            fieldName={'genres'}
                            label={'Generos'}
                            placeholder={'Selecione os generos:'}
                            options={genres}
                            selectedOptions={selectedGenres}
                            setSelectedOptions={setSelectedGenres}
                        />

                        <MultipleSelect
                            fieldName={'subGenres'}
                            label={'Sub Generos'}
                            placeholder={'Selecione os sub generos:'}
                            options={subgenres}
                            selectedOptions={selectedSubGenres}
                            setSelectedOptions={setSelectedSubGenres}
                        />

                        <MultipleSelect
                            fieldName={'platforms'}
                            label={'Plataforma'}
                            placeholder={'Selecione as plataformas:'}
                            options={platforms}
                            selectedOptions={selectedPlatforms}
                            setSelectedOptions={setSelectedPlatforms}
                        />
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                ENVIAR
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default InterestManagement;
