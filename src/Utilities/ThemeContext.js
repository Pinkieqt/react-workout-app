import React from "react";

export const ThemeContext = React.createContext();

export default ({ children }) => {
    const [theme, setTheme] = React.useState(() => {
        if (localStorage.getItem("theme"))
            return localStorage.getItem("theme");
        else
            return "myLightTheme"
    })

    const defaultContext = {
        theme,
        setTheme
    };
    return (
        <ThemeContext.Provider value={defaultContext}>
            {children}
        </ThemeContext.Provider>
    );
};