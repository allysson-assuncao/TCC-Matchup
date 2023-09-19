import React from 'react';
import { FieldProps } from 'formik';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface DatePickerFieldProps {
    id: string;
    label: string;
    sx: SxProps<Theme>;
    /*error: boolean;
    helperText?: boolean | string | undefined;*/
}

const DatePickerField: React.FC<DatePickerFieldProps & FieldProps> = ({id, label, sx}, { field, form, meta, ...props}) => {
    if (!field) return null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={sx}
                id={id}
                label={label}
                error={(meta.touched && !!meta.error)}
                helperText={(meta.touched && meta.error)}
                maxDate={dayjs().subtract(13, 'year')}
                minDate={dayjs().subtract(150, 'year')}
                {...field}
                onChange={(date) => form.setFieldValue(field.name, date)}
                value={field.value || null}
            />
        </LocalizationProvider>
    );
};

export default DatePickerField;
