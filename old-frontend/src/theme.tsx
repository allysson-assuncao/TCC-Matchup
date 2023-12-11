import {createTheme} from '@mui/material/styles';
import {hexToRgb, PaletteMode} from "@mui/material";

let mode: PaletteMode;

if (localStorage.getItem('mode') !== 'dark' && localStorage.getItem('mode') !== 'light') {
    mode = 'dark';
    localStorage.setItem('mode', 'dark');
} else {
    mode = localStorage.getItem('mode') === 'dark' ? 'dark' : 'light';
}

const getTheme = (mode: PaletteMode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'dark' ? hexToRgb('#880ED4') : hexToRgb('#00b0ff'),
                dark: mode === 'dark' ? hexToRgb('#5f0994') : hexToRgb('#9f3edc'),
                light: mode === 'dark' ? hexToRgb('#9f3edc') : hexToRgb('#5f0994'),
                contrastText: mode === 'dark' ? hexToRgb('#ffffff') : hexToRgb('#000000'),
            },
            secondary: {
                main: mode === 'dark' ? hexToRgb('#00b0ff') : hexToRgb('#880ED4'),
                dark: mode === 'dark' ? hexToRgb('#007bb2') : hexToRgb('#33bfff'),
                light: mode === 'dark' ? hexToRgb('#33bfff') : hexToRgb('#007bb2'),
                contrastText: mode === 'dark' ? hexToRgb('#ffffff') : hexToRgb('#000000'),
            },
            text: {
                primary: mode === 'dark' ? hexToRgb('#808080') : hexToRgb('#595959'),
                secondary: mode === 'dark' ? hexToRgb('#595959') : hexToRgb('#808080'),
                disabled: mode === 'dark' ? hexToRgb('#999999') : hexToRgb('#999999'),
            },
            background: {
                default: mode === 'dark' ? hexToRgb('#000000') : hexToRgb('#ffffff'),
                paper: mode === 'dark' ? hexToRgb('#ffffff') : hexToRgb('#000000'),
            },
            divider: mode === 'dark' ? hexToRgb('#5f0994') : hexToRgb('#33bfff'),
        },
    });
export default getTheme;
