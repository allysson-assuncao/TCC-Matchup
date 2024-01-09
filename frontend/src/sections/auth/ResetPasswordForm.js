import * as Yup from "yup";
// form
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
// components
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ForgotPassword} from "../../redux/slices/auth";
import {LoadingButton} from "@mui/lab";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTE_VERIFY_CODE} from "../../routes";

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
    const {isLoading, userPasswordId} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("É necessário preencher o email")
            .email("O email deve ser válido"),
    });

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: {email: ""},
    });

    const {handleSubmit} = methods;

    const onSubmit = async (data) => {
        try {
            //   Send API Request
            dispatch(ForgotPassword(data.email));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        navigate(ROUTE_VERIFY_CODE);
    }, [userPasswordId]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="email" label="Email"/>

            <LoadingButton
                loading={false}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    mt: 3,
                    bgcolor: "text.primary",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover": {
                        bgcolor: "text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                    },
                }}
            >
                Confirmar
            </LoadingButton>
        </FormProvider>
    );
}
