import React, {ChangeEvent, useState} from 'react';
import {Button, Grid, IconButton, MobileStepper, Paper, Typography} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight, Delete, DeleteForever} from '@mui/icons-material';


const ImageUploader: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedImages(Array.from(e.target.files));
            setActiveStep(0);
        }
    };

    /*const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      const fileUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImages(filesArray);
      setSelectedImages(fileUrls);
      setActiveStep(0);
    }
  };*/

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDelete = (index: number) => {
        setSelectedImages((prevImages) => prevImages.filter((image, i) => i !== index));
        setActiveStep((prevActiveStep) => prevActiveStep > 0 ? prevActiveStep - 1 : 0);
    };

    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <Button variant="contained" component="label" sx={{alignItems: "center"}}>
                    <Upload sx={{mr:'13px'}}/>  Adicionar Imagens
                    <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleImageChange}
                    />
                </Button>
            </Grid>
            {selectedImages.length > 0 && (
                <Grid item>
                    <Paper square elevation={0}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <img src={URL.createObjectURL(selectedImages[activeStep])}/>
                            <IconButton onClick={() => handleDelete(activeStep)}>
                                <DeleteForever/>
                            </IconButton>

                        </Grid>
                        <IconButton sx={{color:'primary', bgcolor:`theme.palette.background.default`}} onClick={() => handleDelete(activeStep)}>
                            <Delete/>
                        </IconButton>
                    </Paper>
                    <MobileStepper
                        steps={selectedImages.length}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext}
                                    disabled={activeStep === selectedImages.length - 1}>
                                Next
                                <KeyboardArrowRight/>
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft/>
                                Back
                            </Button>
                        }
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default ImageUploader;
