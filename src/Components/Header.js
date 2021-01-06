import React from "react";
import Navigation from "./Navigation";
import AppendModal from "./AppendModal";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../Utilities/ThemeContext";
import { useMediaQuery } from "react-responsive";

function Header(props) {
  const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <>
      {!isMobile ? (
        <header
          className={`border-b border-${theme}-bg p-3 flex bg-${theme}-bg`}
        >
          <div className={`w-1/2 text-left`}>
            <Navigation usersData={props.usersData} />
          </div>
          <div className={`w-1/2 text-right`}>
            <AppendModal usersData={props.usersData} />
          </div>
        </header>
      ) : (
        <header
          className={`fixed bottom-0 left-0 w-full z-50 border-t border-${theme}-cardbg p-3 flex bg-${theme}-cardbg`}
        >
          <div className={`w-full`}>
            <Navigation usersData={props.usersData} />
          </div>
          {/* <div className={`w-1/2 text-right`}>
            <AppendModal usersData={props.usersData} />
          </div> */}
        </header>
      )}
    </>
  );
}

export default Header;
