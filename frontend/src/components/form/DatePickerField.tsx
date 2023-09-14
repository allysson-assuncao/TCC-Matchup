import React from 'react';
import { FieldProps } from 'formik';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const DatePickerField: React.FC<FieldProps> = ({ field, form, ...props }) => {
    if (!field) return null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker

                maxDate={dayjs().subtract(13, 'year')}
                minDate={dayjs().subtract(150, 'year')}
                {...field}
                {...props}
                onChange={(date) => form.setFieldValue(field.name, date)}
                value={field.value || null} // Certifique-se de que seja nulo se nenhum valor estiver selecionado
            />
        </LocalizationProvider>
    );
};

export default DatePickerField;
