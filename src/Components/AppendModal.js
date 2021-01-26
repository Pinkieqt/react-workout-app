import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import ModalArrivalView from "../Views/ModalArrivalsView";
import ModalWeightView from "../Views/ModalWeightView";
import { ThemeContext } from "../Utilities/ThemeContext";
import Fade from "react-reveal/Fade";

function AppendModal(method_props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });
  const [selector, setSelector] = useState(true);

  useEffect(() => {
    show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [show]);

  //Handler to dismiss modal
  function showHandler() {
    setShow(false);
  }

  return (
    <div>
      {/* Other view for desktop and mobile */}
      {isMobile && (
        <div className={`w-full h-full`} onClick={() => setShow(!show)}>
          <span className={`text-xl text-${theme}-sec w-full h-full`}>
            <FontAwesomeIcon
              role="img"
              aria-label="fntawsm"
              icon={faPlus}
              onClick={() => setShow(!show)}
            />
          </span>
        </div>
      )}

      {!isMobile && (
        <span
          className={`text-l cursor-pointer text-${theme}-tpr`}
          onClick={() => setShow(!show)}
        >
          Připsat data{" "}
          <FontAwesomeIcon role="img" aria-label="fntawsm" icon={faPlus} />
        </span>
      )}

      {/* Menu transition and content */}
      <Fade bottom when={show} duration={500}>
        {show && (
          <div
            className={`fixed bg-${theme}-cardbg top-0 left-0 w-full h-full z-50 p-3 text-center`}
          >
            <div className={`font-bold p-3 text-right`}>
              <span className={`text-xl text-${theme}-tpr`}>
                <FontAwesomeIcon
                  role="img"
                  aria-label="fntawsm"
                  icon={faTimes}
                  className={`cursor-pointer`}
                  onClick={() => setShow(!show)}
                />
              </span>
            </div>

            {selector ? (
              <div>
                <button
                  className={`w-32 rounded-full font-bold bg-${theme}-sec bg-opacity-25 text-${theme}-sec    px-3 py-2 sm:py-2 md:py-3 m-3`}
                >
                  Příchod
                </button>
                <button
                  onClick={() => setSelector(false)}
                  className={`w-32 rounded-full   border text-${theme}-tpr hover:bg-${theme}-sec hover:bg-opacity-50 px-3 py-2 sm:py-2 md:py-3 m-3`}
                >
                  Váha
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelector(true)}
                  className={`w-32 rounded-full   border text-${theme}-tpr hover:bg-${theme}-sec hover:bg-opacity-50 px-3 py-2 sm:py-2 md:py-3 m-3`}
                >
                  Příchod
                </button>
                <button
                  className={`w-32 rounded-full font-bold bg-${theme}-sec bg-opacity-25 text-${theme}-sec    px-3 py-2 sm:py-2 md:py-3 m-3`}
                >
                  Váha
                </button>
              </div>
            )}

            {selector ? (
              <div>
                <ModalArrivalView
                  usersData={method_props.usersData}
                  submitHandler={showHandler}
                />
              </div>
            ) : (
              <div>
                <ModalWeightView
                  usersData={method_props.usersData}
                  submitHandler={showHandler}
                />
              </div>
            )}
          </div>
        )}
      </Fade>
    </div>
  );
}

export default AppendModal;
