import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import AppBarIndex from "../../containers/AppBars/AppBarIndex";
import AppAppBar from "../../components/AppIndex/AppAppBar";
import GameGenres from "../../components/AppIndex/GameGenres";
import WhatIsMatchup from "../../components/AppIndex/WhatIsMatchup";
import GetBeta from "../../components/AppIndex/GetBeta";
import ProductSmokingHero from "../../components/AppIndex/ProductSmokingHero";
import AppFooter from "../../components/AppIndex/AppFooter";
import Introduction from "../../components/AppIndex/Introduction";
import ForWho from "../../components/AppIndex/ForWho";
import {useState} from "react";
import {hexToRgb} from "@mui/material";
import {grey} from "@mui/material/colors";
import getTheme from "../../theme";
import {useCustomTheme} from "../../CustomThemeContext";


const AppIndex: React.FC = () => {
    const { theme: mode } = useCustomTheme();
    const theme = getTheme(mode);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <AppBarIndex></AppBarIndex>
            <Introduction/>
            <WhatIsMatchup/>
            <ForWho/>
            <GameGenres/>
            <GetBeta/>
            <ProductSmokingHero/>
            <AppFooter/>


        </ThemeProvider>
    )

}


export default AppIndex;