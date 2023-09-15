import * as React from 'react';
import {Container, Button, Grid, Link, Typography, TextField} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import theme from "../../theme";

const ForgotPasswordStep3: React.FC = () => {
    return (
        <React.Fragment>
            <Container>
                <Grid justifyContent={"center"}>
                    <Grid>
                        {/*<LockOpenIcon sx={{width:"16px", height:"16px"}} color={theme.palette.primary.main}></LockOpenIcon>*/}
                        <TextField color='primary' sx={{marginBottom: '16px'}} required autoFocus type="password" placeholder="Nova senha" fullWidth/>

                        {/*<LockOpenIcon sx={{width:"16px", height:"16px"}} color={theme.palette.primary.main}></LockOpenIcon>*/}
                        <TextField color='primary' sx={{marginBottom: '16px'}} required type="password" placeholder="Confirme a Senha" fullWidth/>

                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ForgotPasswordStep3;
