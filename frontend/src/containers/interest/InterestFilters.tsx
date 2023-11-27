import React, {useEffect, useState} from 'react';
import {
    Box,
    TextField,
    Grid,
} from '@mui/material';
import {InterestDependency, InterestDto} from "../../model/interest";
import {languages} from "../../resources/languages";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {getAllInterestDependencies, registerAll} from "../../api/interest_requests/registerInterest";
import SimpleSelect from "../../components/fields/SimpleSelect";
import MultipleSelect from "../../components/fields/MultipleSelect";
import {Filter, FILTERS_ATTRIBUTES, OPERATION, OPERATOR} from "../../model/filters";
import {getFilteredInterests} from "../../api/interest_requests/filterRequest";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import {InterestRequest} from "../../model/interest_filtered_request";

interface InterestFiltersProps {
    filteredInterests: InterestRequest | undefined;
    setFilteredInterests: React.Dispatch<React.SetStateAction<InterestRequest | undefined>>;
}

const InterestFilters: React.FC<InterestFiltersProps> = ({filteredInterests, setFilteredInterests}) => {
        const {theme: mode} = useCustomTheme();
        const theme = getTheme(mode);

        const [name, setName] = useState<string>("");

        const [companies, setCompanies] = useState<InterestDependency[]>([]);
        const [selectedCompanies, setSelectedCompanies] = useState<InterestDependency[]>([]);

        const [lowestPrice, setLowestPrice] = useState<number | null>(null);
        const [highestPrice, setHighestPrice] = useState<number | null>(null);

        const [dubbingLanguages, setDubbingLanguages] = useState<InterestDependency[]>(languages);
        const [selectedDubbingLanguages, setSelectedDubbingLanguages] = useState<InterestDependency[]>([]);

        const [subtitledLanguages, setSubtitledLanguages] = useState<InterestDependency[]>(languages);
        const [selectedSubtitledLanguages, setSelectedSubtitledLanguages] = useState<InterestDependency[]>([]);

        const [ageRatings, setAgeRatings] = useState<InterestDependency[]>([]);
        const [selectedAgeRatings, setSelectedAgeRatings] = useState<InterestDependency[]>([]);

        const [genres, setGenres] = useState<InterestDependency[]>([]);
        const [selectedGenres, setSelectedGenres] = useState<InterestDependency[]>([]);

        const [subgenres, setSubgenres] = useState<InterestDependency[]>([]);
        const [selectedSubGenres, setSelectedSubGenres] = useState<InterestDependency[]>([]);

        const [platforms, setPlatforms] = useState<InterestDependency[]>([]);
        const [selectedPlatforms, setSelectedPlatforms] = useState<InterestDependency[]>([]);

        const fetchFilteredInterests = async () => {
            try {
                const filters: Filter[] = [
                    ...(name ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST.NAME,
                        values: [name + ""],
                        operation: OPERATION.LIKE,
                        operator: OPERATOR.AND
                    }] : []),
                    ...(lowestPrice ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST.LOWEST_PRICE,
                        values: [lowestPrice + ""],
                        operation: OPERATION.GREATER_THAN,
                        operator: OPERATOR.AND
                    }] : []),
                    ...(highestPrice ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST.HIGHEST_PRICE,
                        values: [highestPrice + ""],
                        operation: OPERATION.LOWER_THAN,
                        operator: OPERATOR.AND
                    }] : []),
                    ...(selectedGenres && selectedGenres.length > 0 ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.ID,
                        values: selectedGenres.map((g) => g.id + ""),
                        joinTable: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.GENRE_COLUMN_NAME,
                        operation: OPERATION.JOIN,
                        operator: OPERATOR.OR
                    }] : []),
                    ...(selectedSubGenres && selectedSubGenres.length > 0 ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.ID,
                        values: selectedSubGenres.map((s) => s.id + ""),
                        joinTable: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.SUBGENRE_COLUMN_NAME,
                        operation: OPERATION.JOIN,
                        operator: OPERATOR.OR
                    }] : []),
                    ...(selectedSubtitledLanguages && selectedSubtitledLanguages.length > 0 ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.ID,
                        values: selectedSubtitledLanguages.map((sL) => sL.id + ""),
                        joinTable: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.SUBTITLED_LANGUAGES_COLUMN_NAME,
                        operation: OPERATION.JOIN,
                        operator: OPERATOR.OR
                    }] : []),
                    ...(selectedDubbingLanguages && selectedDubbingLanguages.length > 0 ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.ID,
                        values: selectedDubbingLanguages.map((dL) => dL.id + ""),
                        joinTable: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.DUBBING_LANGUAGES_COLUMN_NAME,
                        operation: OPERATION.JOIN,
                        operator: OPERATOR.OR
                    }] : []),
                    ...(selectedCompanies ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.ID,
                        values: selectedCompanies.map((c) => c.id + ""),
                        joinTable: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.COMPANY_COLUMN_NAME,
                        operation: OPERATION.JOIN,
                        operator: OPERATOR.OR
                    }] : []),
                    ...(selectedAgeRatings ? [{
                        column: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.ID,
                        values: selectedAgeRatings.map((aR) => aR.id + ""),
                        joinTable: FILTERS_ATTRIBUTES.INTEREST_DEPENDENCIES.AGE_RATING_COLUMN_NAME,
                        operation: OPERATION.JOIN,
                        operator: OPERATOR.AND
                    }] : [])
                ]


                console.log(filters);
                const fetchFilteredInterests = await getFilteredInterests(filters);
                setFilteredInterests(fetchFilteredInterests);
                return true;
            } catch (error) {
                console.error("Erro ao buscar interesses:", error);
            }
        };

        const handleSearch = async () => {
            await fetchFilteredInterests();
        };

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
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                            label="Nome"
                            placeholder={'Nome do jogo...'}
                        />
                        <IconButton sx={{color: `theme.palette.primary.main`}} onClick={() => handleSearch()}>
                            <SearchIcon></SearchIcon>
                        </IconButton>
                    </Grid>

                    <Grid item xs={12}>
                        {/*<SimpleSelect
                            setSelectedOption={setSelectedCompany}
                            selectedOption={selectedCompany}
                            options={companies}
                            label={"Empresas"}
                            placeholder={"Empresas"}
                            fieldName={"company"}
                        />*/}
                        <MultipleSelect
                            fieldName={'company'}
                            label={'Empresas'}
                            placeholder={'Selecione as empresas:'}
                            options={selectedCompanies}
                            selectedOptions={selectedCompanies}
                            setSelectedOptions={setSelectedCompanies}
                        />
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
                        {/*<SimpleSelect
                            setSelectedOption={setSelectedAgeRatings}
                            selectedOption={selectedAgeRatings}
                            options={ageRatings}
                            label={"Classificação Indicativa"}
                            placeholder={"Classificação Indicativa:"}
                            fieldName={"ageRating"}
                        />*/}
                        <MultipleSelect
                            fieldName={'ageRating'}
                            label={'Classificação Indicativa'}
                            placeholder={'Selecione a classificação indicativa:'}
                            options={ageRatings}
                            selectedOptions={selectedAgeRatings}
                            setSelectedOptions={setSelectedAgeRatings}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <MultipleSelect
                            fieldName={'genres'}
                            label={'Generos'}
                            placeholder={'Selecione os generos:'}
                            options={genres}
                            selectedOptions={selectedGenres}
                            setSelectedOptions={setSelectedGenres}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <MultipleSelect
                            fieldName={'subGenres'}
                            label={'Sub Generos'}
                            placeholder={'Selecione os sub generos:'}
                            options={subgenres}
                            selectedOptions={selectedSubGenres}
                            setSelectedOptions={setSelectedSubGenres}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <MultipleSelect
                            fieldName={'platforms'}
                            label={'Plataforma'}
                            placeholder={'Selecione as plataformas:'}
                            options={platforms}
                            selectedOptions={selectedPlatforms}
                            setSelectedOptions={setSelectedPlatforms}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    }
;

export default InterestFilters;
