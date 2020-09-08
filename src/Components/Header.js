import React from 'react';
import Navigation from './Navigation';
import AppendModal from './AppendModal';

function Header(){
    return (
        <header className="border-b p-3 flex mb-4">
            <span className="font-bold w-1/3">
                💪ezworkout
            </span>

            <div className="w-1/3 text-center">
                <AppendModal />
            </div>
            
            <div className="w-1/3 text-right">
                <Navigation />
            </div>
        </header>
    );
}

export default Header;
