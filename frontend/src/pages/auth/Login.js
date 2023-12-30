import { Link as RouterLink } from "react-router-dom";
// sections
import {Stack, Typography, Link} from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";
import {ROUTE_REGISTER} from "../../routes";
import {useSelector} from "react-redux";
import {useEffect} from "react";

// ----------------------------------------------------------------------

export default function LoginPage() {
    const {isLoggedIn} = useSelector((state) => state.auth);
    /*const navigate = useNavigate();
    useEffect(() => {

    }, [isLoggedIn])*/
    if (isLoggedIn) {
        return <Navigate to={"/app"}/>;
    }
    return (
        <>
            <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
                <Typography variant="h4">Entre no Matchup</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">Ainda não tem uma conta?</Typography>

                    <Link
                        to={`/auth/${ROUTE_REGISTER}`}
                        component={RouterLink}
                        variant="subtitle2"
                    >
                        Cadastre-se
                    </Link>
                </Stack>
            </Stack>
            {/* Form */}
            <Login/>

            <AuthSocial/>
        </>
    );
}
