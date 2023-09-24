import * as React from 'react';
import {Container, Grid, Typography, TextField} from '@mui/material';
import theme from "../../theme";
import {useCustomTheme} from "../../CustomThemeContext";
import getTheme from "../../theme";

const ForgotPasswordStep1: React.FC = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    return (
        <React.Fragment>
            <Container>
                <Grid justifyContent={"center"}>
                    <Grid item>
                        <Grid container justifyContent="center">
                            <Typography variant={"h5"} color={theme.palette.primary.main} sx={{marginBottom: '16px'}}>Esqueceu
                                sua senha?</Typography>
                        </Grid>
                        <Typography sx={{marginBottom: '16px'}}>Informe o seu email e nós enviaremos um código
                            para
                            a redefinição da senha!</Typography>
                        <TextField color='primary' id="email" label="Seu Email" required autoFocus type="email"
                                   placeholder="exemplo@gmail.com" fullWidth/>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ForgotPasswordStep1;
