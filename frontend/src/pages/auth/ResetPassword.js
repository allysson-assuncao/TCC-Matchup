import {Stack, Typography, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import {CaretLeft} from "phosphor-react";
import AuthResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
    return (
        <>
            <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
                <Typography variant="h3" paragraph>
                    Esqueceu sua senha?
                </Typography>

                <Typography sx={{color: "text.secondary", mb: 5}}>
                    Por favor informe o email associado a sua conta e mandaremos
                    um email com o código de redefinição de senha
                </Typography>
            </Stack>

            {/* Reset Password Form */}
            <AuthResetPasswordForm/>

            <Link
                component={RouterLink}
                to={"/auth/login"}
                color="inherit"
                variant="subtitle2"
                sx={{
                    mt: 3,
                    mx: "auto",
                    alignItems: "center",
                    display: "inline-flex",
                }}
            >
                <CaretLeft size={24}/>
                Volte ao login
            </Link>
        </>
    );
};

export default ResetPassword;
