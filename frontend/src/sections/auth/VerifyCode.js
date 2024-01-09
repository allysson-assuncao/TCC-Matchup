import {Stack, Typography, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import {CaretLeft} from "phosphor-react";
import VerifyCodeForm from "./VerifyCodeForm";

const VerifyCode = () => {
    return (
        <>
            <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
                <Typography variant="h3" paragraph>
                    Esqueceu sua senha?
                </Typography>

                <Typography sx={{color: "text.secondary", mb: 5}}>
                    Informe o código enviado para o email
                </Typography>
            </Stack>

            {/* Reset Password Form */}
            <VerifyCodeForm/>

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

export default VerifyCode;
