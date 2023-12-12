import React, {useCallback, useState} from "react";
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

const ProfileForm = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const {user, profilePicture} = useSelector((state) => state.app);


    const ProfileSchema = Yup.object().shape({
        username: Yup.string(),
        bio: Yup.string(),
        //avatar: Yup.string().nullable(true),
    });

    console.log(user);
    console.log(user?.username);
    const defaultValues = {
        username: user?.username,
        bio: user?.bio,
        cellphoneNumber: user?.cellphoneNumber,
        profilePicture: profilePicture,
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
            //   Send API request
            console.log("DATA", data);
            dispatch(
                UpdateUserProfile({
                    username: data?.username !== user.username ? data?.username : "",
                    bio: data?.bio !== user.bio ? data?.bio : null,
                    cellphoneNumber: data?.cellphoneNumber !== user.cellphoneNumber ? data?.cellphoneNumber : "",
                    //avatar: file,

                })
            );
          /*  dispatch(
                UpdateUserProfile({
                    name: data?.name,
                    about: data?.bio,
                    avatar: file,
                })
            );*/

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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
                <RHFUploadAvatar name="profilePicture" maxSize={3145728} onDrop={handleDrop}/>

                <RHFTextField
                    helperText={"This username is visible to your contacts"}
                    name="username"
                    label="Name"
                />
                <RHFTextField
                    name="cellphoneNumber"
                    label="Número de Celular"
                />
                <RHFTextField multiline rows={4} name="bio" label="Bio"/>

                <Stack direction={"row"} justifyContent="end">
                    <LoadingButton
                        color="primary"
                        size="large"
                        type="submit"
                        variant="contained"
                        // loading={isSubmitSuccessful || isSubmitting}
                    >
                        Salvar
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default ProfileForm;
