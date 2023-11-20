import React, {useState} from "react";
import {Autocomplete, Grid, TextField} from "@mui/material";

import {ErrorMessage, Field, FieldProps, FormikProps} from "formik";
import {InterestDependency} from "../../model/interest";

interface MultipleSelectProps {
    fieldName: string;
    label: string;
    placeholder: string;
    options: InterestDependency[];
    selectedOptions: InterestDependency[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<InterestDependency[]>>;
    //requiredField?: boolean;
}

const MultipleSelect = ({fieldName, label, placeholder, options, setSelectedOptions, selectedOptions}: MultipleSelectProps) => {

    return (
        <Grid item xs={12}>
            <Field name={fieldName}>
                {({field, form}: { field: FieldProps, form: FormikProps<InterestDependency> }) => {
                    return (
                        <Autocomplete
                            {...field}
                            value={selectedOptions}
                            multiple
                            fullWidth
                            id="tags-outlined"
                            options={options}
                            getOptionLabel={(options: InterestDependency) => options.name}
                            onChange={(_, newValue: InterestDependency[]) => {
                                form.setFieldValue(fieldName, newValue.map((option: InterestDependency) => Number(option.id)));
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
                    );
                }}
            </Field>
            <ErrorMessage name="" component="div"/>
        </Grid>
    );
};

export default MultipleSelect;
