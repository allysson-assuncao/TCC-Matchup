import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {grey} from "@mui/material/colors";
import {User} from "../model/user";
import theme, {updateMode} from "../theme";
import {hexToRgb, Typography} from "@mui/material";

interface ToggleColorModeButtonProps {
    buttonText?: string;
}

const ToggleColorModeButton: React.FC<ToggleColorModeButtonProps> = ({ buttonText }) => {
    var darkMode = (localStorage.getItem('mode') == 'dark');

    const onClick = () => {
        let mode = darkMode? 'light': 'dark';
        localStorage.setItem('mode', mode);
        updateMode();
        window.location.reload();
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.primary',
                borderRadius: 25,
                //backgroundColor: 'black'
            }}
        >
            <IconButton sx={{ ml: 1 , padding: '0px', margin: '0px'}} onClick={()=> onClick()} color="inherit">
                {darkMode ? <DarkModeIcon color="primary"/> : <LightModeIcon color="primary"/>}
                <Typography variant="body2" sx={{ marginLeft: '11px', fontSize: '16px' }}>
                    {buttonText}
                </Typography>
            </IconButton>

        </Box>
    );
};

export default ToggleColorModeButton;