import React from "react";

export const DefUserContext = React.createContext();

export default ({ children }) => {
  const [defUser, setDefUser] = React.useState(() => {
    if (localStorage.getItem("defaultUser"))
      return localStorage.getItem("defaultUser");
    else return "dudu";
  });

  const defaultContext = {
    defUser,
    setDefUser,
  };

  return (
    <DefUserContext.Provider value={defaultContext}>
      {children}
    </DefUserContext.Provider>
  );
};
