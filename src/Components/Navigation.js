import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTint } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated } from 'react-spring'
import { NavLink } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from "../Utilities/ThemeContext";

function Navigation(){
    //Theme changing
    const { theme, setTheme } = React.useContext(ThemeContext);
    const changeTheme = () => {
        if (theme === "myLightTheme") {
            setTheme("myDarkTheme")
            localStorage.setItem("theme", "myDarkTheme")
        }
        else {
            setTheme("myLightTheme")
            localStorage.setItem("theme", "myLightTheme")
        }
    };

    const [show, setShow] = useState(false); //default
    const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });

    //Router NavLink styling
    let navlinkStyle = "text-" + theme + "-sec md:border-b-2";

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
                    <div className={`w-full h-full`} onClick={() => setShow(!show)} >
                        <span className={`text-xl text-${theme}-tpr`}>
                            <FontAwesomeIcon role="img" aria-label="fntawsm" icon={ faBars } onClick={() => setShow(!show)} />
                        </span>
                    </div>
                    { /* Mask/background transition and content */ }
                    {
                        maskTransition.map(({ item, key, props }) =>
                            item && 
                            <animated.div 
                                key={key} 
                                style={props} 
                                className={`bg-black-t-30 fixed top-0 left-0 w-full kokot z-50`}
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
                                className={`fixed bg-${theme}-bg top-0 left-0 w-3/5 h-full z-50 shadow p-3`}
                            >
                                <div className={`font-bold p-3 text-center border-b-2 border-${theme}-sec text-${theme}-tpr`}>
                                    Gym u Duduho ✌️
                                </div>
                                <ul className={`text-left`}>
                                    <li> <NavLink exact to="/" activeClassName={navlinkStyle} className={`py-3 block text-${theme}-pr text-xl`} onClick={() => setShow(false)}>Dashboard</NavLink> </li>
                                    <li> <NavLink to="/weight" activeClassName={navlinkStyle} className={`py-3 block text-${theme}-pr text-xl`} onClick={() => setShow(false)}>Tělesná váha</NavLink> </li>
                                    <li> <NavLink to="/plans" activeClassName={navlinkStyle} className={`py-3 block text-${theme}-pr text-xl`} onClick={() => setShow(false)}>Plány</NavLink> </li>
                                    <li> <NavLink to="/records" activeClassName={navlinkStyle} className={`py-3 block text-${theme}-pr text-xl`} onClick={() => setShow(false)}>Maximálky</NavLink> </li>
                                    <li className={`py-3 block text-xl`} onClick={() => changeTheme()} >
                                        <span className={`text-xl text-${theme}-pr cursor-pointer`}>
                                            Změnit téma&nbsp; &nbsp;
                                            <FontAwesomeIcon role="img" aria-label="fntawsm" icon={ faTint }/>
                                        </span>
                                    </li>
                                </ul>
                            </animated.div>
                        )
                    }
                </div>
            }
    
            { /* Desktop view of navigation */ }
            {!isMobile &&
                <div>
                    <NavLink exact to="/" activeClassName={navlinkStyle} className={`inline p-3 text-${theme}-pr`}>Dashboard</NavLink>
                    <NavLink to="/weight" activeClassName={navlinkStyle} className={`inline p-3 text-${theme}-pr`}>Tělesná váha</NavLink>
                    <NavLink to="/plans" activeClassName={navlinkStyle} className={`inline p-3 text-${theme}-pr`}>Plány</NavLink>
                    <NavLink to="/records" activeClassName={navlinkStyle} className={`inline p-3 text-${theme}-pr`}>Maximálky</NavLink>
                    <li className={`inline p-3`}> 
                        <span className={`text-xl text-${theme}-pr cursor-pointer`}>
                            <FontAwesomeIcon role="img" aria-label="fntawsm" icon={ faTint } onClick={() => changeTheme()} />
                        </span>
                    </li>
                </div>
            }
        </nav>
    );
}

export default Navigation;
