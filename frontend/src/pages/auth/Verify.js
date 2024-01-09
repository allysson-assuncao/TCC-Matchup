import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link } from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";
import VerifyForm from "../../sections/auth/VerifyForm";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Por favor verifique o OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            {/*Enviado para o Email (shreyanshshah242@gmail.com)*/}
              Código enviado
          </Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
}
