import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Utilities/ThemeContext";

function Footer(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  //function to backup and download whole JSON db
  function backUp() {
    let pass = prompt("Zadej heslo:", "");
    if (pass != null && pass === "download") {
      let jsonObj = JSON.stringify(props.data.data, 0, 4);
      let blob1 = new Blob([jsonObj], { type: "text/plain;charset=utf-8" });

      var url = window.URL || window.webkitURL;
      let link = url.createObjectURL(blob1);
      var a = document.createElement("a");
      a.download = "Backup.json";
      a.href = link;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return (
    <footer
      className={`flex justify-evenly sm:justify-evenly md:justify-center flex-wrap content-center bg-${theme}-cardbg text-${theme}-tpr text-center text-l p-3 w-full`}
    >
      <div className={`w-1/3 my-5`}>
        <a href="https://github.com/Pinkieqt/react-workout-app">
          <span className={`text-xl mr-1`}>
            <FontAwesomeIcon role="img" aria-label="fntawsm" icon={faGithub} />
          </span>
        </a>
      </div>
      <div className={`w-1/3 my-5 mb-20 sm:mb-20 lg:mb-0`}>
        Created by
        <span className={`text-${theme}-sec`}>&nbsp;Dudu</span>
        <span className={`text-xl ml-1`}>
          <FontAwesomeIcon role="img" aria-label="fntawsm" icon={faHeart} />
        </span>
      </div>
      <div className={`w-1/3 my-5 mb-20 sm:mb-20 lg:mb-0`}>
        <span className={`text-xl ml-1 cursor-pointer`}>
          <FontAwesomeIcon
            role="img"
            aria-label="fntawsm"
            icon={faFileArchive}
            onClick={() => backUp()}
          />
        </span>
      </div>
    </footer>
  );
}

export default Footer;
