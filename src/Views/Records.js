import React, { useState, useEffect } from "react";
import { ThemeContext } from "../Utilities/ThemeContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import Exercises from "../Helpfiles/Exercises";
import Members from "../Helpfiles/Members";
import MuscleGroups from "../Helpfiles/MuscleGroups";
import FloatingDialog from "../Components/FloatingDialog";

function RecordsComponent(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedUser, setSelectedUser] = useState("dudu");
  const [isLoading, setIsLoading] = useState(true);

  //Generate new content everytime when props change
  useEffect(() => {
    if (props.usersData.data.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [props, selectedUser]);

  //Cards
  let cards = Exercises.map((exercise) => {
    if (!isLoading) {
      const memberData = props.usersData.data.filter((member) => {
        return member.id === selectedUser;
      });

      let work = 0;
      let max = 0;

      //Members max and work weights
      if (memberData) {
        if (memberData[0].exercisesData.length > 0) {
          memberData[0].exercisesData.forEach((element) => {
            if (element.key === exercise.key) {
              work = element.work;
              max = element.max;
            }
          });
        }
      }

      //Color of card background -> legs/shoulders/hands/chest/back
      let tableDesign = "bg-orange-300"; //LEGS default
      if (exercise.category === "chest") tableDesign = "bg-blue-300";
      else if (exercise.category === "back") tableDesign = "bg-yellow-400";
      else if (exercise.category === "shoulders") tableDesign = "bg-red-300";
      else if (exercise.category === "arms") tableDesign = "bg-green-300";

      if (selectedGroup === "all" || exercise.category === selectedGroup) {
        return (
          <div
            key={exercise.key}
            className={`w-1/2 sm:w-1/2 md:w-64 p-1 sm:p-1 md:p-5`}
          >
            <div
              key={exercise.key}
              className={`w-full sm:w-full md:w-56 bg-${theme}-cardbg rounded-lg shadow-lg text-left`}
            >
              <div className={`w-full h-1 rounded-full ${tableDesign}`}></div>
              <span
                className={`flex justify-between px-2 sm:px-2 md:px-6 pt-2`}
              >
                <span
                  className={`tracking-wider inline-block text-${theme}-cardbg text-xs px-2 mt-1 rounded-full uppercase  ${tableDesign}`}
                >
                  {" "}
                  {exercise.kategorie}{" "}
                </span>
                <FloatingDialog
                  usersData={props.usersData}
                  selectedUser={selectedUser}
                  exlabel={exercise.label}
                  exercise={exercise.key}
                  exMax={max}
                  exWork={work}
                />
              </span>
              <div className={`px-2 sm:px-2 md:px-6 pb-6 mt-2`}>
                <div className={`font-bold text-${theme}-tpr`}>
                  {" "}
                  {exercise.label}{" "}
                </div>
                <div className={`text-${theme}-tsec`}> Pracovní: {work} kg</div>
                <div className={`text-${theme}-tsec`}> Maximální: {max} kg</div>
              </div>
            </div>
          </div>
        );
      }
    }
  });

  //Select options
  let userOptions = Members.map((member) => (
    <option key={member.key} value={member.key}>
      {member.label}
    </option>
  ));

  let muscleOptions = MuscleGroups.map((member) => (
    <option key={member.key} value={member.category}>
      {member.label}
    </option>
  ));

  return (
    <div className={`p-3 min-h-screen bg-${theme}-bg`}>
      <div className={`items-center text-center`}>
        {isLoading && (
          <div className={`flex justify-center mt-64`}>
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && (
          <div className={`container mx-auto`}>
            <span>
              <h3 className={`text-${theme}-tsec mb-1 mt-5 sm:mt-5 md:mt-10`}>
                Vyber uživatele a uprav váhy kliknutím na ikonu "editace" v
                pravém rohu každého cviku.
              </h3>
              <h3 className={`text-${theme}-tsec mb-5 mt-1 sm:mt-1 md:mt-2`}>
                Můžeš si také zobrazit pouze vybranou svalovou skupinu.
              </h3>
            </span>

            <select
              className={`text-${theme}-tpr bg-${theme}-bg text-xl p-2 mb-5 cursor-pointer mx-3`}
              name="members"
              id="memberSelector"
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {userOptions}
            </select>
            <select
              className={`text-${theme}-tpr bg-${theme}-bg text-xl p-2 mb-5 cursor-pointer mx-3`}
              name="members"
              id="memberSelector"
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {muscleOptions}
            </select>

            <div className={`flex justify-center flex-wrap`}>{cards}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordsComponent;
