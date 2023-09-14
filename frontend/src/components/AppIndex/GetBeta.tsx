import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Button, Snackbar, TextField, Typography} from "@mui/material";
import theme from "../../theme";

const GetBeta = () => {
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="section" sx={{display: 'flex', marginTop: '150px'}}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6} sx={{zIndex: 1, justifyContent: 'center'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: 'background.default',
                            py: 8,
                            px: 3,
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: '10px',
                            marginBottom: '150px',
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} sx={{maxWidth: 400}} textAlign={'center'}>
                            <Typography color={theme.palette.background.paper} variant="h2" component="h2" gutterBottom>
                                Acesso Antecipado!
                            </Typography>
                            <Typography color={theme.palette.background.paper} variant="h5">
                                Teste a versão beta do aplicativo quando disponível
                            </Typography>
                            <TextField
                                /*noBorder*/
                                placeholder="Seu email"
                                variant="standard"
                                sx={{width: '100%', mt: 3, mb: 2}}
                            />
                            <Button
                                type="submit"
                                //color="primary"
                                variant="contained"
                                sx={{width: '100%', backgroundColor: "primary.main"}}
                            >
                                Mantenha-se Atualizado
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                {/* <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>*/}
            </Grid>
            <Snackbar
                open={open}
                /*closeFunc={handleClose}*/
                message="Obrigado pela preferência, enviaremos a versão beta assim que disponível."
            />
        </Container>
    );
}

export default GetBeta;
