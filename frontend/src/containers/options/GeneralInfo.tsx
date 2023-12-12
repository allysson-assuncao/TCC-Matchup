import React, {useState} from "react";
import * as Yup from "yup";
import {
    Grid,
    TextField,
    Button,
    Snackbar, CssBaseline, Container, Box, Avatar
} from '@mui/material';
import {UpdateUserPayload, User} from "../../model/user";

import {Field, FieldProps, Form, Formik} from "formik";
import {getProfilePictureByUserId} from "../../api/user_requests/getUserBy";
import {useNavigate} from "react-router-dom";
import {ROUTE_HOME, ROUTE_PROFILE} from "../../App2";
import {validateUpdateUserData} from "../../utils/validation/UserValidation";
import {useLoggedUser} from "../../contexts/UserContext";
import {updateUserData} from "../../api/user_requests/updateUserData";

interface GeneralInfoProps {
    fromRegister: boolean
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({fromRegister}) => {
    const {loggedUser, setLoggedUser} = useLoggedUser();
    const history = useNavigate();
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

    const initialValues = {
        username: loggedUser ? loggedUser.username : '',
        bio: loggedUser ? loggedUser.bio : '',
        cellphoneNumber: loggedUser ? loggedUser.cellphoneNumber : ''
    }


    const handleSubmit = async (values: any, actions: any) => {
        let user: UpdateUserPayload = {
            id: loggedUser ? loggedUser.id : BigInt(-1),
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
        setLoggedUser(updatedUser);
        if (!loggedUser) {
            console.error("Erro: Usuário não está logado.");
            return;
        }
        if(imageWasChanged) localStorage.setItem("profilePicture", await getProfilePictureByUserId(loggedUser.id, 800, 800));
        setOpen(true);
        if(fromRegister){
            history(ROUTE_HOME);
        }else {
            history(`${ROUTE_PROFILE}/${loggedUser.username}`);
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
                    validateOnBlur={true}
                    onSubmit={(values, actions) => handleSubmit(values, actions)}
                    validate={(values) => {
                        const schema = validateUpdateUserData(loggedUser);
                        return schema.validate(values, { abortEarly: false })
                            .then(() => { return {}; })
                            .catch((err: { errors: any[]; inner: any[]; }) => {
                                if (err instanceof Yup.ValidationError) {
                                    return err.errors.reduce((errors: {[key: string]: string}, error) => {
                                        const path = err.inner.find((e) => e.message === error)?.path;
                                        if (path) {
                                            errors[path] = error;
                                        }
                                        return errors;
                                    }, {});
                                }
                                return Promise.reject(err);
                            });
                    }}
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
