import React, {ChangeEvent, useState} from 'react';
import {Button, Grid, IconButton, MobileStepper, Paper} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight, Delete, Upload} from '@mui/icons-material';
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import getTheme from "../../theme";

interface ImageUploaderProps {
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({setImages}) => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray: File[] = Array.from(e.target.files);
            const resizedImages = await Promise.all(filesArray.map((file) => resizeImage(file)));
            const fileUrls = resizedImages.map((file) => URL.createObjectURL(file));
            setSelectedImages(fileUrls);
            setImages(resizedImages);
            setActiveStep(0);
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDelete = (index: number) => {
        setImages((prevImages) => prevImages.filter((image, i) => i !== index));
        setSelectedImages((prevImages) => prevImages.filter((image, i) => i !== index));
        setActiveStep((prevActiveStep) => prevActiveStep > 0 ? prevActiveStep - 1 : 0);
    };

    return (
        <Grid container direction="column" alignItems="center">
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
                <Grid item justifyContent={'center'}>
                    <Paper square elevation={0}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <img src={selectedImages[activeStep]} alt="Selected" style={{maxWidth: '100%'}}/>
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

async function resizeImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let { width, height } = img;
            if (height > 800) {
                width *= 800 / height;
                height = 800;
            }
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Could not resize image'));
                    return;
                }
                const resizedFile = new File([blob], file.name, { type: blob.type });
                resolve(resizedFile);
            }, file.type);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

export default ImageUploader;
