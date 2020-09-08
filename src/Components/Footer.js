import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(){
    return (
        <footer className="bg-gray-200 text-center text-l p-3 w-full">
            <a href="https://github.com/Pinkieqt/react-workout-app">
                <span className="text-xl mr-1">
                    <FontAwesomeIcon icon={ faGithub } />
                </span>
                Github
            </a>
            , created by
            <span className="text-red-300">
                Dudu    
            </span>
        </footer>
    );
}

export default Footer;
