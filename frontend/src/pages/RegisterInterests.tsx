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
import RegisterDependencyDialog from "../components/dialog/RegisterDependencyDialog";
import {Interest, INTEREST_DEPENDENCIES, InterestDependency, InterestDto} from "../model/interest";
import MultipleSelect from "../components/fields/MultipleSelect";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";
import SimpleSelect from "../components/fields/SimpleSelect";

const RegisterInterests: React.FC = () => {
    const [dropdownData, setDropdownData] = useState<{ [key: string]: any[] }>({});

    const [name, setName] = useState<string>();

    const [companies, setCompanies] = useState<InterestDependency[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<InterestDependency>();

    const [lowestPrice, setLowestPrice] = useState<number>();
    const [highestPrice, setHighestPrice] = useState<number>();

    const [dubbingLanguages, setDubbingLanguages] = useState<InterestDependency[]>(languages);
    const [selectedDubbingLanguages, setSelectedDubbingLanguages] = useState<InterestDependency[]>([]);

    const [subtitledLanguages, setSubtitledLanguages] = useState<InterestDependency[]>(languages);
    const [selectedSubtitledLanguages, setSelectedSubtitledLanguages] = useState<InterestDependency[]>([]);


    const [ageRatings, setAgeRatings] = useState<InterestDependency[]>([]);
    const [selectedAgeRating, setSelectedAgeRating] = useState<InterestDependency>();

    const [genres, setGenres] = useState<InterestDependency[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<InterestDependency[]>([]);

    const [subgenres, setSubgenres] = useState<InterestDependency[]>([]);
    const [selectedSubGenres, setSelectedSubGenres] = useState<InterestDependency[]>([]);

    const [platforms, setPlatforms] = useState<InterestDependency[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<InterestDependency[]>([]);

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


    const handleFormSubmit = async () => {
        let interest: InterestDto = {
            name: name,
            companyId: Number(selectedCompany?.id),
            highestPrice: highestPrice,
            lowestPrice: lowestPrice,
            dubbingLanguagesIdList: selectedDubbingLanguages.map(o => o.id + ""),
            subtitleLanguagesIdList: selectedSubtitledLanguages.map(o => o.id + ""),
            genresIdList: selectedGenres.map(o => Number(o.id)),
            ageRatingId: Number(selectedAgeRating?.id),
            subGenresIdList: selectedGenres.map(o => Number(o.id)),
            platformsIdList: selectedPlatforms.map(o => Number(o.id)),
        }


        console.log(interest);
        alert(interest)
        await registerAll('interest', interest);
        // Handle success, e.g., redirect or show a success message

    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Cadastrar Interesses
                </Typography>


                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                            label="Nome do jogo..."
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container flexDirection={'row'} spacing={3}>
                            <Grid item xs={10}>
                                <SimpleSelect
                                    setSelectedOption={setSelectedCompany}
                                    selectedOption={selectedCompany}
                                    options={companies}
                                    label={"Empresas"}
                                    placeholder={"Empresas"}
                                    fieldName={"company"}
                                />
                            </Grid>
                            {/*<Grid item md={10}>
                                        <Field name="company">
                                            {({field}: FieldProps) => (
                                                <FormControl fullWidth variant="outlined" required>
                                                    <InputLabel htmlFor="company">Empresas:</InputLabel>
                                                    <Select
                                                        {...field}
                                                        label="Empresas"
                                                        value={selectedCompany}
                                                        onChange={(e, child) => {
                                                            setSelectedCompany(e.target.value);
                                                        }}
                                                    >
                                                        {companies?.map((item) => (
                                                            <MenuItem value={Number(item.id)}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>*/}
                            <Grid item md={2} alignItems={'center'}>
                                <RegisterDependencyDialog
                                    type={INTEREST_DEPENDENCIES.COMPANY}
                                    dialogTitle={'Nova Empresa'}
                                    buttonText={''}
                                    label={'Nome da Empresa'}
                                    setDependency={setCompanies}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="number"
                            label="Menor preço"
                            onChange={(e) => setLowestPrice(Number(e.target.value))}
                            inputProps={{min: 0, step: 0.01}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="number"
                            label="Maior preço"
                            onChange={(e) => setHighestPrice(Number(e.target.value))}
                            inputProps={{min: 0, step: 0.01}}
                        />
                    </Grid>

                    <MultipleSelect
                        fieldName={'dubbingLanguages'}
                        label={'Dublado'}
                        placeholder={'Selecione as linguagens dubladas:'}
                        options={dubbingLanguages}
                        selectedOptions={selectedDubbingLanguages}
                        setSelectedOptions={setSelectedDubbingLanguages}
                    />


                    <MultipleSelect
                        fieldName={'subtitledLanguages'}
                        label={'Legendado'}
                        placeholder={'Selecione as linguagens legendadas:'}
                        options={subtitledLanguages}
                        selectedOptions={selectedSubtitledLanguages}
                        setSelectedOptions={setSelectedSubtitledLanguages}
                    />


                    <Grid item xs={12}>
                        <SimpleSelect
                            setSelectedOption={setSelectedAgeRating}
                            selectedOption={selectedAgeRating}
                            options={ageRatings}
                            label={"Classificação Indicativa"}
                            placeholder={"Classificação Indicativa:"}
                            fieldName={"ageRating"}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container flexDirection={'row'} spacing={3}>
                            <Grid item md={10}>
                                <MultipleSelect
                                    fieldName={'genres'}
                                    label={'Generos'}
                                    placeholder={'Selecione os generos:'}
                                    options={genres}
                                    selectedOptions={selectedGenres}
                                    setSelectedOptions={setSelectedGenres}
                                />
                            </Grid>
                            <Grid item md={2} alignItems={'center'}>
                                <RegisterDependencyDialog
                                    type={INTEREST_DEPENDENCIES.GENRE}
                                    dialogTitle={'Novo Gênero'}
                                    buttonText={''}
                                    label={'Nome do Gênero'}
                                    setDependency={setGenres}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container flexDirection={'row'} spacing={3}>
                            <Grid item md={10}>
                                <MultipleSelect
                                    fieldName={'subGenres'}
                                    label={'Sub Generos'}
                                    placeholder={'Selecione os sub generos:'}
                                    options={subgenres}
                                    selectedOptions={selectedSubGenres}
                                    setSelectedOptions={setSelectedSubGenres}
                                />
                            </Grid>
                            <Grid item md={2} alignItems={'center'}>
                                <RegisterDependencyDialog
                                    type={INTEREST_DEPENDENCIES.SUBGENRE}
                                    dialogTitle={'Novo Sub Gênero'}
                                    buttonText={''}
                                    label={'Nome do Sub Gênero'}
                                    setDependency={setSubgenres}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container flexDirection={'row'} spacing={3}>
                            <Grid item md={10}>
                                <MultipleSelect
                                    fieldName={'platforms'}
                                    label={'Plataforma'}
                                    placeholder={'Selecione as plataformas:'}
                                    options={platforms}
                                    selectedOptions={selectedPlatforms}
                                    setSelectedOptions={setSelectedPlatforms}
                                />
                            </Grid>
                            <Grid item md={2} alignItems={'center'}>
                                <RegisterDependencyDialog
                                    type={INTEREST_DEPENDENCIES.PLATFORM}
                                    dialogTitle={'Nova Plataforma'}
                                    buttonText={''}
                                    label={'Nome da Plataforma'}
                                    setDependency={setPlatforms}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary"
                                onClick={() => handleFormSubmit()}>
                            ENVIAR
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default RegisterInterests;
