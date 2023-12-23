import React, {useCallback, useEffect, useState} from "react";
import * as Yup from "yup";
// form
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import {RHFTextField, RHFUploadAvatar} from "../../../components/hook-form";
import {Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {UpdateUserProfile} from "../../../redux/slices/app";
import {AWS_S3_REGION, S3_BUCKET_NAME} from "../../../config";
import {resizeImage} from "../../../utils/ResizeImage";
import {isUsernameAvailable} from "../../../api/user_requests/register";
import {LoginUser, RefreshToken} from "../../../redux/slices/auth";

function formatPhoneNumber(value) {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 2) {
        return `(${onlyNums}`;
    }
    if (onlyNums.length <= 6) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
    if (onlyNums.length <= 10) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7)}`;
    }
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`;
}

const ProfileForm = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const {user, isUserUpdated} = useSelector((state) => state.app);


    /*const ProfileSchema = Yup.object().shape({
        username: Yup.string()
                .required('Campo obrigatório!')
                .min(5, 'O Nome de Usuário deve ter no mínimo 5 caracteres!')
                .max(20, 'O Nome de Usuário deve ter no máximo 20 caracteres!')
                .matches(/^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Nome de usuário não pode possuir símbolos diferentes de "_", "-" e ".", e só podem estar entre caracteres!')
                .test('username', 'Nome de Usuário já está em Uso!', async function (value) {
                    if(user.username === value) return true;
                    return (await isUsernameAvailable(value));
                }),
        bio: Yup.string(),
        //profilePicture: Yup.string().nullable(true),});
    })*/
    const ProfileSchema = Yup.object().shape({
        username: Yup.string()
            .required('Campo obrigatório!')
            .min(5, 'O Nome de Usuário deve ter no mínimo 5 caracteres!')
            .max(20, 'O Nome de Usuário deve ter no máximo 20 caracteres!')
            .matches(/^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Nome de usuário não pode possuir símbolos diferentes de "_", "-" e ".", e só podem estar entre caracteres!')
            .test('username', 'Nome de Usuário já está em Uso!', async function (value) {
                const isValid = /^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/.test(value);
                if (!isValid) return false;
                if(user.username === value) return true;
                return (await isUsernameAvailable(value));
            }),
        bio: Yup.string(),
        cellphoneNumber: Yup.string()
            .matches(/^\\+\\d{2}\\s\\(\\d{2}\\)\\s\\d{5}-\\d{4}$/, 'Número de celular inválido!'),
        profilePicture: Yup.mixed().nullable(true),
    });



    const defaultValues = {
        username: user?.username,
        bio: user?.bio,
        cellphoneNumber: user?.cellphoneNumber,
        profilePicture: user?.formattedProfilePicture,
    };

    const methods = useForm({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });


    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting, isSubmitSuccessful},
    } = methods;

    const values = watch();

    const onSubmit = async (data) => {
        try {

            dispatch(
                UpdateUserProfile({
                    username: data?.username !== user.username ? data?.username : null,
                    bio: data?.bio !== user.bio ? data?.bio : null,
                    cellphoneNumber: data?.cellphoneNumber !== user.cellphoneNumber ? data?.cellphoneNumber : null,
                    profilePicture: file ? await resizeImage(file, 512) : null,
                }, (data?.username !== user.username))
            );

        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            setFile(file);

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue("profilePicture", newFile, {shouldValidate: true});
            }
        },
        [setValue]
    );

    return (
        <>
            {isUserUpdated && (
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                        <RHFUploadAvatar name="profilePicture" maxSize={3145728} onDrop={handleDrop}/>

                        <RHFTextField
                            helperText={"Esse nome de usuário é visível aos outros usuários"}
                            name="username"
                            label="Nome de Usuário"
                        />
                        <RHFTextField
                            name="cellphoneNumber"
                            label="Número de Celular"
                            onChange={e => {
                                const formatted = formatPhoneNumber(e.target.value);
                                setValue(e.target.name, formatted);
                            }}
                        />
                        <RHFTextField
                            multiline
                            rows={4}
                            name="bio"
                            label="Bio"
                        />

                        <Stack direction={"row"} justifyContent="end">
                            <LoadingButton
                                color="primary"
                                size="large"
                                type="submit"
                                variant="contained"
                                disabled={!methods.formState.isDirty || !methods.formState.isValid || isSubmitting}
                                // loading={isSubmitSuccessful || isSubmitting}
                            >
                                Salvar
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </FormProvider>
            )}
        </>
    );
};

export default ProfileForm;
