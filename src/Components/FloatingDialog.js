import React, { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Notification from "./Notification";
import { ThemeContext } from "../Utilities/ThemeContext";

const firebase = require("firebase");

function FloatingDialog(props) {
  //usersData, selectedUser, exercise (key)
  const { theme, setTheme } = React.useContext(ThemeContext);

  const [show, setShow] = useState(false);
  const [max, setMax] = useState(0);
  const [work, setWork] = useState(0);
  const [label, setLabel] = useState("");

  useEffect(() => {
    setMax(props.exMax);
    setWork(props.exWork);
    setLabel(props.exlabel);
    show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [props, show]);

  //React spring
  const menuTransition = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  //function on button submit
  function onSubmit() {
    const db = firebase.firestore();
    //get initial data of exerscise for selected member
    if (props.usersData !== undefined) {
      const memberData = props.usersData.data.filter((member) => {
        return member.id === props.selectedUser;
      });

      let isExerciseInside = false;

      if (memberData.length > 0) {
        let tmpExData = memberData[0].exercisesData;
        tmpExData.forEach((element) => {
          if (element.key === props.exercise) {
            isExerciseInside = true;
            element.work = work;
            element.max = max;
          }
        });

        if (!isExerciseInside) {
          tmpExData.push({ key: props.exercise, max: max, work: work });
        }

        //Update record in database
        db.collection("users")
          .doc(props.selectedUser)
          .update({ exercisesData: tmpExData })
          .then(function () {
            Notification(label + " upraven.", false);
          })
          .catch(function (error) {
            console.log(error);
            Notification("Chyba", true);
          });

        //Close dialog
        setShow(false);
      }
    }
  }

  return (
    <>
      <span>
        <FontAwesomeIcon
          role="img"
          aria-label="fntawsm"
          className={`text-${theme}-tsec hover:text-${theme}-tpr cursor-pointer`}
          icon={faEdit}
          onClick={() => setShow(!show)}
        />
      </span>

      {/* Menu transition and content */}
      {menuTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className={`fixed bg-black-t-30 top-0 left-0 w-full h-auto z-50`}
              // onClick={() => setShow(!show)}
            >
              <div className={`flex h-screen`}>
                <div className={`m-auto`}>
                  <div
                    className={`w-64 sm:w-64 md:w-64 bg-${theme}-cardbg rounded-lg m-1 sm:m-1 md:m-6 text-center`}
                  >
                    <h2 className={`py-6 text-xl text-${theme}-tpr`}>
                      {label}
                    </h2>
                    {/* <h2 className={`py-1 text-lg text-${theme}-tpr`}>dsad</h2> */}

                    <label className={`w-full text-${theme}-tsec`}>
                      Pracovní váha
                    </label>
                    <div className={`py-3`}>
                      <button
                        className={`text-center text-${theme}-tsec text-3xl mx-2`}
                        onClick={() =>
                          setWork((parseFloat(work) - 1).toFixed(1))
                        }
                      >
                        &#8592;
                      </button>
                      <input
                        className={`font-bold text-xl text-center bg-${theme}-cardbg text-${theme}-tpr`}
                        type="number"
                        id="workingWeight"
                        name="workingWeight"
                        min="0"
                        max="300"
                        step="0.5"
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                      />
                      <button
                        className={`text-center text-${theme}-tsec text-3xl mx-2`}
                        onClick={() =>
                          setWork((parseFloat(work) + 1).toFixed(1))
                        }
                      >
                        &#8594;
                      </button>
                    </div>

                    <label className={`w-full text-${theme}-tsec pt-5`}>
                      Maximální váha
                    </label>
                    <div className={`py-3`}>
                      <button
                        className={`text-center text-${theme}-tsec text-3xl mx-2`}
                        onClick={() => setMax((parseFloat(max) - 1).toFixed(1))}
                      >
                        &#8592;
                      </button>
                      <input
                        className={`font-bold text-xl text-center bg-${theme}-cardbg text-${theme}-tpr`}
                        type="number"
                        id="maxWeight"
                        name="maxWeight"
                        min="0"
                        max="300"
                        step="0.5"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                      <button
                        className={`text-center text-${theme}-tsec text-3xl mx-2`}
                        onClick={() => setMax((parseFloat(max) + 1).toFixed(1))}
                      >
                        &#8594;
                      </button>
                    </div>
                    <div className={`flex justify-center w-full`}>
                      <button
                        onClick={() => setShow(!show)}
                        type="submit"
                        className={`w-1/2 text-${theme}-sec rounded-lg p-3 m-3 mt-12`}
                      >
                        Storno
                      </button>
                      <button
                        onClick={() => onSubmit()}
                        type="button"
                        className={`rounded-full font-bold bg-${theme}-sec bg-opacity-25 text-${theme}-sec hover:bg-opacity-50 border border-${theme}-cardbg p-3 m-3 mt-12 w-1/2`}
                      >
                        Uložit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
}

export default FloatingDialog;
