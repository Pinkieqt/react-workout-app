import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Utilities/ThemeContext";

function Footer() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <footer
      className={`flex justify-evenly flex-wrap content-center bg-${theme}-footerbg text-white text-center text-l p-3 w-full`}
    >
      <div className={`w-1/2 my-5`}>
        <a href="https://github.com/Pinkieqt/react-workout-app">
          <span className={`text-xl mr-1`}>
            <FontAwesomeIcon role="img" aria-label="fntawsm" icon={faGithub} />
          </span>
          Github
        </a>
      </div>
      <div className={`w-1/2 my-5 mb-20 sm:mb-20 lg:mb-0`}>
        Created by
        <span className={`text-${theme}-sec`}>&nbsp;Dudu</span>
        <span className={`text-xl ml-1`}>
          <FontAwesomeIcon role="img" aria-label="fntawsm" icon={faHeart} />
        </span>
        <br></br>
      </div>
    </footer>
  );
}

export default Footer;
