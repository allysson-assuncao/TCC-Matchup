import * as React from 'react';
import {Container, Grid, TextField} from '@mui/material';
import theme from "../../theme";

const ForgotPasswordStep2: React.FC = () => {
    return (
        <React.Fragment>
            <Container>
                <Grid justifyContent={"center"}>
                    <Grid>
                        <TextField color='primary' sx={{marginBottom: '16px'}} required autoFocus type="text" placeholder="Código" fullWidth/>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ForgotPasswordStep2;
