import React from "react";
import {Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {InterestDependency} from "../../model/interest";

interface MultipleSelectProps {
    fieldName: string;
    label: string;
    placeholder: string;
    options: InterestDependency[];
    selectedOption: InterestDependency | undefined;
    setSelectedOption: React.Dispatch<React.SetStateAction<InterestDependency | undefined>>;
}

const SimpleSelect = ({fieldName, label, placeholder, options, setSelectedOption, selectedOption}: MultipleSelectProps) => {

    return (
        <FormControl fullWidth variant="outlined" required>
            <InputLabel htmlFor={fieldName}> {label}</InputLabel>
            <Select
                label={label}
                value={selectedOption}
                onChange={(e) => {
                    const value = e.target.value;
                    if(!value) return;
                    if(typeof value != 'string' && value) {
                        if (setSelectedOption) {
                            setSelectedOption(value);
                        }
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
