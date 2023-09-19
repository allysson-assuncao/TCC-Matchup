import {createTheme, ThemeProvider} from '@mui/material/styles';
import purple from '@mui/material/colors/purple';
import {cyan, grey} from "@mui/material/colors";
import {hexToRgb, PaletteMode} from "@mui/material";
import React from "react";
import {boolean} from "yup";
import ReactDOM from "react-dom/client";
import App from "./App";

let mode: PaletteMode | null;

if (localStorage.getItem('mode') != 'dark' && localStorage.getItem('mode') != 'light') {
    mode = 'dark';
    localStorage.setItem('mode', 'dark');
} else {
    if(localStorage.getItem('mode') == 'dark'){
        mode = 'dark';
    }else{
        mode = 'light';
    }
}

export function setMode(mode2: PaletteMode) {
    mode = mode2;
}

var lastMode: string | null;

export const updateMode = () => {
    let mode = localStorage.getItem('mode');
    console.log('updateMode');
    //if(darkMode == lastMode) return;

    if (mode == 'dark') {
        theme.palette.mode = 'dark';
        theme.palette.primary.main = hexToRgb('#880ED4');
        theme.palette.primary.dark = hexToRgb('#5f0994');
        theme.palette.primary.light = hexToRgb('#9f3edc');
        /*theme.palette.primary.contrastText = hexToRgb('#5f0994');*/
        theme.palette.secondary.main = hexToRgb('#00b0ff');
        theme.palette.secondary.dark = hexToRgb('#007bb2');
        theme.palette.secondary.light = hexToRgb('#33bfff');
        /*theme.palette.secondary.contrastText = hexToRgb('#5f0994');*/
        theme.palette.text.primary = hexToRgb('#808080');
        theme.palette.text.secondary = hexToRgb('#595959');
        theme.palette.text.disabled = hexToRgb('#999999');
        theme.palette.divider = hexToRgb('#5f0994');
        theme.palette.background.default = hexToRgb('#000000');
        theme.palette.background.paper = hexToRgb('#ffffff');
    } else {
        theme.palette.mode = 'light';
        theme.palette.primary.main = hexToRgb('#00b0ff');
        theme.palette.primary.dark = hexToRgb('#9f3edc');
        theme.palette.primary.light = hexToRgb('#5f0994');
        /*theme.palette.primary.contrastText = hexToRgb('#5f0994');*/
        theme.palette.secondary.main = hexToRgb('#880ED4');
        theme.palette.secondary.dark = hexToRgb('#33bfff');
        theme.palette.secondary.light = hexToRgb('#007bb2');
        /*theme.palette.secondary.contrastText = hexToRgb('#5f0994');*/
        theme.palette.text.primary = hexToRgb('#595959');
        theme.palette.text.secondary = hexToRgb('#808080');
        theme.palette.text.disabled = hexToRgb('#999999');
        theme.palette.divider = hexToRgb('#33bfff');
        theme.palette.background.default = hexToRgb('#ffffff');
        theme.palette.background.paper = hexToRgb('#000000');
    }
    lastMode = mode;
}

const theme =
    createTheme({
        palette: {
            mode,
            primary: {
                main: hexToRgb('#880ED4'),
                dark: hexToRgb('#5f0994'),
                light: hexToRgb('#9f3edc'),
            },
            secondary: {
                main: hexToRgb('#00b0ff'),
                dark: hexToRgb('#007bb2'),
                light: hexToRgb('#33bfff'),
            },
            background: {},
        },

    });
export default theme;
