import React from 'react';
import Navigation from './Navigation';
import AppendModal from './AppendModal';
import { NavLink } from "react-router-dom";

function Header(props){
    return (
        <header className="border-b p-3 flex mb-4 bg-myTheme-cardbg">
            <span className="font-bold w-1/3 text-myTheme-tpr">
                <NavLink exact to="/">💪 Gym u Duduho</NavLink>
            </span>

            <div className="w-1/3 text-center">
                <AppendModal usersData={props.usersData}/>
            </div>
            
            <div className="w-1/3 text-right">
                <Navigation />
            </div>
        </header>
    );
}

export default Header;
