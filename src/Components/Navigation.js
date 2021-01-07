import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faHeartbeat,
  faAdjust,
  faSignOutAlt,
  faWeightHanging,
  faTasks,
  faDiceD6,
} from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../Utilities/ThemeContext";
import { UserContext } from "../App";
import AppendModal from "./AppendModal";

const firebase = require("firebase");

function Navigation(method_props) {
  //Theme changing
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { loggedUser, setLoggedUser } = React.useContext(UserContext);
  const changeTheme = () => {
    if (theme === "myLightTheme") {
      setTheme("myDarkTheme");
      localStorage.setItem("theme", "myDarkTheme");
    } else {
      setTheme("myLightTheme");
      localStorage.setItem("theme", "myLightTheme");
    }
  };

  const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });

  //Router NavLink styling
  let navlinkStyle = "text-" + theme + "-sec md:border-b-2";

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        setLoggedUser(null);
      })
      .catch((e) => {
        setLoggedUser(null);
      });
  }

  return (
    <nav>
      {/* Mobile view of navigation */}
      {isMobile && (
        <div className={"flex justify-around"}>
          <NavLink
            exact
            to="/"
            activeClassName={navlinkStyle}
            className={`block text-${theme}-pr text-xl`}
          >
            <FontAwesomeIcon role="img" aria-label="fntawsm" icon={faDiceD6} />
          </NavLink>
          <NavLink
            to="/plans"
            activeClassName={navlinkStyle}
            className={`block text-${theme}-pr text-xl`}
          >
            <FontAwesomeIcon role="img" aria-label="fntawsm" icon={faTasks} />
          </NavLink>
          <div
            className={`w-8 h-8 rounded-full bg-${theme}-sec bg-opacity-25 text-center`}
          >
            <AppendModal usersData={method_props.usersData} />
          </div>
          <NavLink
            to="/weight"
            activeClassName={navlinkStyle}
            className={`block text-${theme}-pr text-xl`}
          >
            <FontAwesomeIcon
              role="img"
              aria-label="fntawsm"
              icon={faHeartbeat}
            />
          </NavLink>
          <NavLink
            to="/records"
            activeClassName={navlinkStyle}
            className={`block text-${theme}-pr text-xl`}
          >
            <FontAwesomeIcon
              role="img"
              aria-label="fntawsm"
              icon={faWeightHanging}
            />
          </NavLink>
        </div>
      )}

      {/* Desktop view of navigation */}
      {!isMobile && (
        <div>
          <NavLink
            exact
            to="/"
            activeClassName={navlinkStyle}
            className={`inline p-3 text-${theme}-pr`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/weight"
            activeClassName={navlinkStyle}
            className={`inline p-3 text-${theme}-pr`}
          >
            Tělesná váha
          </NavLink>
          <NavLink
            to="/plans"
            activeClassName={navlinkStyle}
            className={`inline p-3 text-${theme}-pr`}
          >
            Plány
          </NavLink>
          <NavLink
            to="/records"
            activeClassName={navlinkStyle}
            className={`inline p-3 text-${theme}-pr`}
          >
            Maximálky
          </NavLink>
          <li className={`inline p-3`}>
            <span className={`text-xl text-${theme}-pr cursor-pointer`}>
              <FontAwesomeIcon
                role="img"
                aria-label="Theme"
                icon={faAdjust}
                onClick={() => changeTheme()}
              />
            </span>
          </li>
          <li className={`inline p-3`}>
            <span className={`text-xl text-${theme}-pr cursor-pointer`}>
              <FontAwesomeIcon
                role="img"
                aria-label="Logout"
                icon={faSignOutAlt}
                onClick={() => signOut()}
              />
            </span>
          </li>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
