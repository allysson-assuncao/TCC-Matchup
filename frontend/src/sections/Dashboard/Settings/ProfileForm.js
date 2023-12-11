import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../../redux/slices/app";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user, profilePicture } = useSelector((state) => state.app);


  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    bio: Yup.string().required("About is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  console.log(user);
  console.log(user?.name);
  const defaultValues = {
    name: user?.name,
    bio: user?.bio,
    avatar: profilePicture,
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
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      //   Send API request
      console.log("DATA", data);
      dispatch(
        UpdateUserProfile({
          name: data?.name,
          about: data?.bio,
          avatar: file,
        })
      );
      dispatch(
          UpdateUserProfile({
            name: data?.name,
            about: data?.bio,
            avatar: file,
          })
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
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="name"
          label="Name"
        />
        <RHFTextField multiline rows={4} name="bio" label="Bio" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
