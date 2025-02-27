import React, { createContext, useContext, useEffect, useState } from 'react'
import { ContextProviderProps, ThemeContextType } from '../Types/Contexts';




const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider: React.FC<ContextProviderProps> = ({ children }) => {

    const [theme, setTheme] = useState<string>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);

    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a Theme Provider');

    }

    return context;
}
