import React from "react";

export const UserContext = React.createContext();

export default ({ children }) => {
    const [loggedUser, setLoggedUser] = React.useState(null);

    const defaultContext = null;
    return (
        <UserContext.Provider value={defaultContext}>
            {children}
        </UserContext.Provider>
    );
};