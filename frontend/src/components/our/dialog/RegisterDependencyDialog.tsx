import React, {useState} from "react";
import {registerInterestDependency} from "../../../api/interest_requests/registerInterest";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {InterestDependency} from "../../../model/interest";
import Grid from "@mui/material/Grid";
import {useSelector} from "react-redux";

interface RegisterDependencyDialogProps {
    type: string;

    buttonText: string;
    dialogTitle: string;
    label: string;
    setDependency: React.Dispatch<React.SetStateAction<InterestDependency[]>>;
}

const RegisterDependencyDialog: React.FC<RegisterDependencyDialogProps> = (

    {
        type,
        label,
        dialogTitle,
        buttonText,
        setDependency,
    }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const {theme} = useSelector((state: any) => state.app);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegisterDependency = async () => {
        try {
            handleClose();

            const response = await registerInterestDependency(type, name);

            if(!response) return;

            setDependency(prevDependency => [...prevDependency, response]);
            setName("");
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
                        <Grid justifyContent={'space-between'}>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleRegisterDependency} color="primary" variant={'outlined'}>
                                Cadastrar
                            </Button>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </Grid>
        </>
    );
};

export default RegisterDependencyDialog;
