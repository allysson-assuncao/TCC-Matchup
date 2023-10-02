import React, {useEffect, useState} from "react";
import {
    Grid,
    TextField,
    Button,
    Snackbar, FormControl, CssBaseline, Container, Box, Avatar
} from '@mui/material';
import {getUser, updateUser} from "../../pages/home/Home";
import {SignInPayload, UpdateUserPayload, User} from "../../model/user";

import {updateUserData} from "../../api/user_requests/updateUserData";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";
import {Field, FieldProps, Form, Formik} from "formik";
import {getProfilePictureByUserId} from "../../api/user_requests/getUserBy";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ROUTE_HOME, ROUTE_INDEX, ROUTE_PROFILE} from "../../App";
import {validateUpdateUserData} from "../../utils/validation/UserValidation";

interface GeneralInfoProps {
    fromRegister: boolean
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({fromRegister}) => {
    const {theme: mode} = useCustomTheme();
    const history = useNavigate();
    const theme = getTheme(mode);
    const [birthday, setBirthday] = useState("");
    const [image, setImage] = useState(localStorage.getItem('profilePicture')+"");
    const [profilePicture, setProfilePicture] = useState(undefined);
    const [cellphoneNumber, setCellphoneNumber] = useState();
    const [open, setOpen] = React.useState(false);
    const [imageWasChanged, setImageWasChanged] = React.useState(false);


    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        setProfilePicture(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImage(reader.result);
                setImageWasChanged(true);
            }
        };

        reader.readAsDataURL(file);
    };

   /* function formatPhoneNumber(value: any) {
        if (!value) {
            return value;
        }

        const onlyNums = value.replace(/[^\d]/g, '');
        if (onlyNums.length <= 2) {
            setCellphoneNumber(`(${onlyNums}`);
        }
        if (onlyNums.length <= 6) {
            setCellphoneNumber(`(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`);
        }
        if (onlyNums.length <= 10) {
            setCellphoneNumber(`(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7)}`);
        }
        setCellphoneNumber(`(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`);
    }*/

    const initialValues = {
        username: getUser().username,
        bio: getUser().bio,
        cellphoneNumber: getUser().cellphoneNumber
    }

    const handleSubmit = async (values: any, actions: any) => {
        let user: UpdateUserPayload = {
            id: getUser().id,
        }

        if(imageWasChanged){
            user.profilePicture = profilePicture;
        }

        if(values.username != initialValues.username){
            user.username = values.username;
        }

        if(values.bio != initialValues.bio){
            user.bio = values.bio;
        }

        if(values.cellphoneNumber != initialValues.cellphoneNumber){
            user.cellphoneNumber = values.cellphoneNumber;
        }
        console.log(values.cellphoneNumber);
        console.log(user);
        let updatedUser: User = await updateUserData(user);

        if (!updatedUser) return;
        updateUser(updatedUser);
        if(imageWasChanged) localStorage.setItem("profilePicture", await getProfilePictureByUserId(getUser().id, 800, 800));
        setOpen(true);
        if(fromRegister){
            history(ROUTE_HOME);
        }else {
            history(`${ROUTE_PROFILE}/${getUser().username}`);
        }
        
    }

    const handleClose = () => {
        setOpen(false);
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
                <Formik
                    initialValues={initialValues}
                    validationSchema={validateUpdateUserData}
                    validateOnBlur={true}

                    onSubmit={(values, actions) => handleSubmit(values, actions)}
                >
                    {(formikProps) => (
                        <Form>
                            <Grid container alignContent={"center"} justifyContent="center" justifyItems={"center"}>
                                <input
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={handleImageUpload}
                                />
                                <label htmlFor="raised-button-file">
                                    <Avatar
                                        alt={"Foto de Perfil"}
                                        src={image}
                                        style={{width: '100px', height: '100px', cursor: 'pointer'}}/>
                                </label>
                                {!fromRegister &&
                                    <Field name="username">
                                        {({field, meta}: FieldProps) => (
                                            <TextField
                                                {...field}
                                                margin="normal"
                                                fullWidth
                                                autoFocus
                                                variant="outlined"
                                                label="Nome de Usuário"
                                                error={(meta.touched && !!meta.error)}
                                                helperText={(meta.touched && meta.error)}
                                            />
                                        )}
                                    </Field>}


                                <Field name="cellphoneNumber">
                                    {({field, meta}: FieldProps) => (
                                        <TextField
                                            {...field}
                                            /*onChange={e => {
                                                const formatted = formatPhoneNumber(e.target.value);
                                            }}*/
                                            margin="normal"
                                            fullWidth
                                            autoFocus
                                            variant="outlined"
                                            label={fromRegister ? "Número de Celular (Opcional)" : "Número de Celular"}
                                            //value={cellphoneNumber}
                                            error={(meta.touched && !!meta.error)}
                                            helperText={(meta.touched && meta.error)}
                                        />
                                    )}
                                </Field>

                                <Field name="bio">
                                    {({field, meta}: FieldProps) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            fullWidth
                                            label="Bio (Opcional)"
                                            variant="outlined"
                                            type="text"
                                            rows={fromRegister? 15: 10}
                                            multiline={true}
                                            error={(meta.touched && !!meta.error)}
                                            helperText={(meta.touched && meta.error)}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Button fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{mt: 3}}>
                                {fromRegister ? "CONCLUIR" : "SALVAR ALTERAÇÕES"}
                            </Button>

                        </Form>
                    )}
                </Formik>

                <Grid item>
                    <Snackbar
                        open={open}
                        onClose={handleClose}
                        message="Informações alteradas com sucesso!"
                    />
                </Grid>

            </Box>
        </Container>

    );
};

export default GeneralInfo;
