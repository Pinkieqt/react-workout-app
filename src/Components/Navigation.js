import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated } from 'react-spring'
import { NavLink } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

function Navigation(){

    const [show, setShow] = useState(false); //default
    const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });

    //Router NavLink styling
    let navlinkStyle = "text-red-400";

    //React Spring
    const maskTransition = useTransition(show, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const menuTransition = useTransition(show, null, {
        from: { opacity: 0, transform: "translateX(-100%)" },
        enter: { opacity: 1, transform: "translateX(0%)" },
        leave: { opacity: 0, transform: "translateX(-100%)" },
    })

    return (
        <nav>
            { /* Mobile view of navigation */ }
            {isMobile &&
                <div>
                    <span className="text-xl">
                        <FontAwesomeIcon icon={ faBars } onClick={() => setShow(!show)} />
                    </span>

                    { /* Mask/background transition and content */ }
                    {
                        maskTransition.map(({ item, key, props }) =>
                            item && 
                            <animated.div 
                                key={key} 
                                style={props} 
                                className="bg-black-t-30 fixed top-0 left-0 w-full h-full z-50"
                                onClick={() => setShow(false)}
                            >
                            </animated.div>
                        )
                    }


                    { /* Menu transition and content */ }
                    {
                        menuTransition.map(({ item, key, props }) =>
                            item && 
                            <animated.div 
                                key={key} 
                                style={props} 
                                className="fixed bg-gray-300 top-0 left-0 w-3/5 h-full z-50 shadow p-3 "
                            >
                                <div className="font-bold p-3 text-center border-b-2 border-gray-500">
                                    Workout app ✌️
                                </div>
                                <ul className="text-left">
                                    <li> <NavLink exact to="/" activeClassName={navlinkStyle} className="py-3 block" onClick={() => setShow(false)}>Dashboard</NavLink> </li>
                                    <li> <NavLink to="/weight" activeClassName={navlinkStyle} className="py-3 block" onClick={() => setShow(false)}>Tělesné váhy</NavLink> </li>
                                    <li> <NavLink to="/records" activeClassName={navlinkStyle} className="py-3 block" onClick={() => setShow(false)}>Maximálky</NavLink> </li>
                                </ul>
                            </animated.div>
                        )
                    }
                </div>
            }
    
            { /* Desktop view of navigation */ }
            {!isMobile &&
                <div>
                    <NavLink exact to="/" activeClassName={navlinkStyle} className="inline p-3">Dashboard</NavLink>
                    <NavLink to="/weight" activeClassName={navlinkStyle} className="inline p-3">Tělesné váhy</NavLink>
                    <NavLink to="/records" activeClassName={navlinkStyle} className="inline p-3">Maximálky</NavLink>
                </div>
            }
        </nav>
    );
}

export default Navigation;
