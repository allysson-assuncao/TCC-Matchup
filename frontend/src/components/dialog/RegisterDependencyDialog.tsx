import React, {useState} from "react";
import {registerInterestDependency} from "../../api/interest_requests/registerInterest";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {INTEREST_DEPENDENCIES, InterestDependency} from "../../model/interest";

interface RegisterDependencyDialogProps {
    onCompanyRegistered: () => void;
    type: string;

    buttonText: string;
    dialogTitle: string;
    label: string;
    setCompanies: React.Dispatch<React.SetStateAction<InterestDependency[]>>;
    setGenres: React.Dispatch<React.SetStateAction<InterestDependency[]>>;
    setSubgenres: React.Dispatch<React.SetStateAction<InterestDependency[]>>;
    setPlatforms: React.Dispatch<React.SetStateAction<InterestDependency[]>>;
}

const RegisterDependencyDialog: React.FC<RegisterDependencyDialogProps> = (

    {
        onDependencyRegistered,
        type,
        label,
        dialogTitle,
        buttonText,
        setDependency,
    }) => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegisterCompany = async () => {
        try {
            handleClose();

            const response = await registerInterestDependency(type, name);
            if (type == INTEREST_DEPENDENCIES.COMPANY) {
                setCompanies((prevCompany) => {
                    return prevCompany.map(company => {
                        return response;
                    });
                });
            }

            /*switch(type){
                case INTEREST_DEPENDENCIES.COMPANY:
                    const response: Company | undefined = await registerInterestDependency(type, name);
                    break;
                case INTEREST_DEPENDENCIES.AGE_RATING:

                    break;
                case INTEREST_DEPENDENCIES.GENRE:

                    break;

            }*/

            onCompanyRegistered();
        } catch (error) {
            console.error(`Erro ao cadastrar ${type}:`, error);
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Cadastrar {buttonText}
            </Button>
            <Grid bgcolor={theme.palette.background.default}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Cadastrar {dialogTitle}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label={label}
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{mt: '10px'}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleRegisterDependency} color="primary" variant={'outlined'}>
                            Cadastrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </>
    );
};

export default RegisterDependencyDialog;
