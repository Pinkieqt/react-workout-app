import React from "react";
import Navigation from "./Navigation";
import AppendModal from "./AppendModal";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../Utilities/ThemeContext";

function Header(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <header className={`border-b border-${theme}-bg p-3 flex bg-${theme}-bg`}>
      <div className={`w-1/2 text-left`}>
        <Navigation />
      </div>
      <div className={`w-1/2 text-right`}>
        <AppendModal usersData={props.usersData} />
      </div>
    </header>
  );
}

export default Header;
