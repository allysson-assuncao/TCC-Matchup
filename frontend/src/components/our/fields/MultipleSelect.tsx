import React from "react";
import {Autocomplete, Grid, TextField} from "@mui/material";

import {InterestDependency} from "../../../model/interest";

interface MultipleSelectProps {
    fieldName: string;
    label: string;
    placeholder: string;
    options: InterestDependency[];
    selectedOptions: InterestDependency[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<InterestDependency[]>>;
}

const MultipleSelect = ({
                            fieldName,
                            label,
                            placeholder,
                            options,
                            setSelectedOptions,
                            selectedOptions
                        }: MultipleSelectProps) => {

    return (
        <Grid item xs={12}>
            <Autocomplete
                value={selectedOptions}
                multiple
                fullWidth
                id="tags-outlined"
                options={options}
                getOptionLabel={(options: InterestDependency) => options.name}
                onChange={(_, newValue: InterestDependency[]) => {
                    setSelectedOptions(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        sx={{minWidth: '420px'}}
                    />
                )}
            />
        </Grid>
    );
};

export default MultipleSelect;
