import {createTheme} from '@mui/material/styles';
import purple from '@mui/material/colors/purple';
import {cyan, grey} from "@mui/material/colors";
import {hexToRgb, PaletteMode} from "@mui/material";
import React from "react";

let mode: PaletteMode = 'dark';

export function setMode(mode2: PaletteMode) {
    mode = mode2;
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
            background: {
            },
        },

    });
export default theme;