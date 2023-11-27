import React, { createContext, useState, useContext, ReactNode } from 'react';
import {PaletteMode} from "@mui/material";

type ThemeContextType = {
    theme: PaletteMode;
    toggleTheme: () => void;
};

const CustomThemeContext = createContext<ThemeContextType | undefined>(undefined);

type CustomThemeProviderProps = {
    children: ReactNode;
};

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
    let initialMode: PaletteMode = 'dark';
    if (localStorage.getItem('mode') === 'light') {
        initialMode = 'light';
    }
    const [theme, setTheme] = useState(initialMode);

    const toggleTheme = () => {
        let newMode: PaletteMode = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('mode', newMode);
        setTheme(newMode);
    };

    return (
        <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </CustomThemeContext.Provider>
    );
};

export const useCustomTheme = () => {
    const context = useContext(CustomThemeContext);
    if (context === undefined) {
        throw new Error('useCustomTheme must be used within a CustomThemeProvider');
    }
    return context;
};
