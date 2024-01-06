import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import AppBarIndex from "../../containers/appbars/AppBarIndex";
import GameGenres from "../../containers/index/GameGenres";
import WhatIsMatchup from "../../containers/index/WhatIsMatchup";
import GetBeta from "../../containers/index/GetBeta";
import ProductSmokingHero from "../../containers/index/ProductSmokingHero";
import AppFooter from "../../containers/index/AppFooter";
import Introduction from "../../containers/index/Introduction";
import ForWho from "../../containers/index/ForWho";
import {useCustomTheme} from "../../contexts/CustomThemeContext";
import {Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const AppIndex: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack>
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
        </Stack>
    )

}

export default AppIndex;