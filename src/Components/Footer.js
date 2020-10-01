import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Footer(){
    return (
        <footer className="flex justify-evenly flex-wrap content-center bg-myTheme-pr text-white text-center text-l p-3 w-full">
            <div className="w-1/2 my-5">
                <a href="https://github.com/Pinkieqt/react-workout-app">
                    <span className="text-xl mr-1">
                        <FontAwesomeIcon icon={ faGithub } />
                    </span>
                    Github
                </a>
            </div>
            <div className="w-1/2 my-5">
                Created by
                <span className="text-myTheme-sec">
                    &nbsp;Dudu    
                </span>
                <span className="text-xl ml-1">
                        <FontAwesomeIcon icon={ faHeart } />
                </span>
                <br></br>
                
            </div>
            
        </footer>
    );
}

export default Footer;
