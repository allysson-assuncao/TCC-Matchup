import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {grey} from "@mui/material/colors";

interface ToggleColorModeButtonProps {
    darkMode: boolean;
    onClick: () => void;
}

const ToggleColorModeButton: React.FC<ToggleColorModeButtonProps> = ({ darkMode, onClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.primary',
                borderRadius: 25,
            }}
        >
            <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
                {darkMode ? <DarkModeIcon color="primary"/> : <LightModeIcon color="primary"/>}
            </IconButton>
        </Box>
    );
};

export default ToggleColorModeButton;