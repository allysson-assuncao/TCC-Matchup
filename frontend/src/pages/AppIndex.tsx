import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import AppBarIndex from "../containers/appbars/AppBarIndex";
import GameGenres from "../containers/index/GameGenres";
import WhatIsMatchup from "../containers/index/WhatIsMatchup";
import GetBeta from "../containers/index/GetBeta";
import ProductSmokingHero from "../containers/index/ProductSmokingHero";
import AppFooter from "../containers/index/AppFooter";
import Introduction from "../containers/index/Introduction";
import ForWho from "../containers/index/ForWho";
import getTheme from "../theme";
import {useCustomTheme} from "../CustomThemeContext";


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
