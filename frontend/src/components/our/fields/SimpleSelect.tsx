
import React from "react";
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {InterestDependency} from "../../../model/interest";
import Grid from "@mui/material/Grid";

/*
interface MultipleSelectProps {
    fieldName: string;
    label: string;
    placeholder: string;
    options: InterestDependency[];
    selectedOption: InterestDependency | undefined;
    setSelectedOption: React.Dispatch<React.SetStateAction<InterestDependency | undefined>>;
}

const SimpleSelect = ({
                          fieldName,
                          label,
                          placeholder,
                          options,
                          setSelectedOption,
                          selectedOption
                      }: MultipleSelectProps) => {

    return (
        <FormControl fullWidth variant="outlined" required>
            <InputLabel htmlFor={fieldName}> {label}</InputLabel>
            <Select
                label={label}
                value={selectedOption}
                onChange={(e) => {
                    const value = e.target.value;
                    if (typeof value != 'string') {
                        setSelectedOption(value);
                    }
                }}
                placeholder={placeholder}
            >
                {options?.map((item) => (
                    <MenuItem value={Number(item.id)
                    }>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
};

export default SimpleSelect;
*/

interface SimpleSelectProps {
    fieldName: string;
    label: string;
    placeholder: string;
    options: InterestDependency[];
    selectedOption: InterestDependency | undefined;
    setSelectedOption: React.Dispatch<React.SetStateAction<InterestDependency | undefined>>;
}

const SimpleSelect: React.FC<SimpleSelectProps> = ({
                                                       fieldName,
                                                       label,
                                                       placeholder,
                                                       options,
                                                       setSelectedOption,
                                                       selectedOption,
                                                   }) => {
    return (
        <Grid item xs={12}>
            <Autocomplete
                value={selectedOption}
                fullWidth
                id="autocomplete"
                options={options}
                getOptionLabel={(option) => option.name}
                onChange={(event: React.SyntheticEvent<Element, Event>, newValue: InterestDependency | null) => {
                    if(newValue != null) setSelectedOption(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        fullWidth
                        variant="outlined"
                    />
                )}
            />
        </Grid>
    );
};

export default SimpleSelect;

