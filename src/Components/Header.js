import React from 'react';
import Navigation from './Navigation';
import AppendModal from './AppendModal';
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../Utilities/ThemeContext";

function Header(props){
    const { theme, setTheme } = React.useContext(ThemeContext);
    return (
        <header className={`border-b border-${theme}-cardbg p-3 flex bg-${theme}-cardbg`}>
            <span className={`font-bold w-1/3 text-${theme}-tpr items-center content-center`}>
                <NavLink exact to="/">💪🏼</NavLink>
            </span>

            <div className={`w-1/3 text-center`}>
                <AppendModal usersData={props.usersData}/>
            </div>
            
            <div className={`w-1/3 text-right`}>
                <Navigation />
            </div>
        </header>
    );
}

export default Header;
