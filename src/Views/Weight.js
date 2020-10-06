import React from "react";
import { ThemeContext } from "../Utilities/ThemeContext";

function WeightComponent(){
    const { theme, setTheme } = React.useContext(ThemeContext);
    return (
        <div className={`p-3 min-h-screen bg-${theme}-bg`}>
            <div className={`flex flex-wrap justify-center`}>
                <p className={`mt-64 text-xl text-${theme}-tpr`}>to be done 🤷‍♂️</p>
            </div>
        </div>
    )
}

export default WeightComponent;