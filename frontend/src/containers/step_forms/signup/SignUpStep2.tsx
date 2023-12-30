import React, {useState} from 'react';
import {
    Box,
    Container,
    CssBaseline,
    TextField,
    Typography
} from '@mui/material';
import {Field, FieldProps, FormikProps} from 'formik';

/*import logo from '../../../img/logo-matchup3.png';*/
import {completeAddressByCep} from "../../../api/user_requests/register";
import {SignUpStep2Payload} from "../../../model/address";

function formatZipcode(value: any) {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 4) {
        return onlyNums;
    }
    if (onlyNums.length <= 8) {
        return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5)}`;
    }
    return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`;
}

const SignUpStep2: React.FC = () => {
    const[wasAddressRequested, setAddressRequested] = useState(false)

    const completeAddress = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, form: FormikProps<any>) => {
        const zipCode = e.target.value;
        if (zipCode.length === 9) {
            try {
                const addressFromApi = await completeAddressByCep(zipCode);
                let address: SignUpStep2Payload = {
                    zipcode: addressFromApi.cep,
                    state: addressFromApi.uf,
                    city: addressFromApi.localidade,
                    neighborhood: addressFromApi.bairro,
                    street: addressFromApi.logradouro,
                }

                // Update signup fields with address data
                form.setFieldValue('addressState', address.state || '');
                form.setFieldValue('addressCity', address.city || '');
                form.setFieldValue('addressNeighborhood', address.neighborhood || '');
                form.setFieldValue('addressStreet', address.street || '');
                setAddressRequested(true);
            } catch (error) {
                console.error(error);
            }
        }else{
            setAddressRequested(false);
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/*<img src={logo+''} alt=""/>*/}
                <Typography component="h1" variant="h5">
                    Cadastre-se
                </Typography>


                <Field name="addressZipcode">
                    {({ field, meta, form }: FieldProps) => (
                        <TextField
                            {...field}
                            onChange={e => {
                                const formatted = formatZipcode(e.target.value);
                                form.setFieldValue(field.name, formatted);
                            }}
                            onBlur={(e) => completeAddress(e, form)}
                            margin="normal"
                            required
                            fullWidth
                            id="zipcode"
                            label="CEP"
                            autoFocus
                            variant="outlined"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                        />
                    )}
                </Field>
                <Field name="addressState">

                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="Estado"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                            disabled={wasAddressRequested}
                        />
                    )}
                </Field>
                <Field name="addressCity">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="Cidade"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                            disabled={wasAddressRequested}
                        />
                    )}
                </Field>
                <Field name="addressNeighborhood">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="addressNeighborhood"
                            label="Bairro"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            disabled={wasAddressRequested}
                        />
                    )}
                </Field>
                <Field name="addressStreet">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="addressStreet"
                            label="Rua / Avenida"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                            disabled={wasAddressRequested}
                        />
                    )}
                </Field>
                <Field name="addressNumber">
                    {({field, meta}: FieldProps) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="addressNumber"
                            label="Número"
                            variant="outlined"
                            error={(meta.touched && !!meta.error)}
                            helperText={(meta.touched && meta.error)}
                        />
                    )}
                </Field>


            </Box>
        </Container>
    );
};

export default SignUpStep2;

