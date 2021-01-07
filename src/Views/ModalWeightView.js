import React, { useState, useEffect } from "react";
import Members from "../Helpfiles/Members";
import Notification from "../Components/Notification";
import { ThemeContext } from "../Utilities/ThemeContext";

const firebase = require("firebase");

function ModalWeightView(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const [selectedUser, setSelectedUser] = useState("dudu");
  const [inputWeight, setInputWeight] = useState(70);

  let options = Members.map((member) => (
    <option key={member.key} value={member.key}>
      {member.label}
    </option>
  ));

  //Get previous weight of selected user
  useEffect(() => {
    const memberData = props.usersData.data.filter((item) => {
      return item.id === selectedUser;
    });

    //Get latest weight record
    let tmpWeight =
      memberData[0].weightData[memberData[0].weightData.length - 1];

    //Set it as state
    if (tmpWeight !== undefined) setInputWeight(tmpWeight.weight);
    else setInputWeight(70);
  }, [selectedUser]);

  //Select handler
  function onSelectChangeHandle(e) {
    setSelectedUser(e.target.value);
  }

  //Range select handler
  function onInputHandle(e) {
    setInputWeight(parseFloat(e.target.value).toFixed(1));
  }

  function onSubmit() {
    const db = firebase.firestore();

    let date = new Date();
    date.setHours(12, 0, 0, 0);

    const memberData = props.usersData.data.filter((member) => {
      return member.id === selectedUser;
    });
    let isInside = false;
    let tmpWeight = memberData[0].weightData;

    //check if already inside -> then only update
    tmpWeight.forEach((element) => {
      if (
        element.date.toDate().getTime() ===
        firebase.firestore.Timestamp.fromDate(date).toDate().getTime()
      ) {
        element.weight = inputWeight * 1;
        isInside = true;
      }
    });

    //if not then add
    if (!isInside) {
      tmpWeight.push({
        date: firebase.firestore.Timestamp.fromDate(date),
        weight: inputWeight * 1,
      });
    }

    //Update record in database
    db.collection("users")
      .doc(selectedUser)
      .update({ weightData: tmpWeight })
      .catch(function (error) {
        console.log(error);
        Notification("Chyba", true);
      });

    //Notification
    Notification(
      "Váha zapsána pro uživatele " + memberData[0].name + ".",
      false
    );

    //Dismiss modal
    props.submitHandler();
  }

  return (
    <div>
      <h2 className={`font-bold mt-5 mb-5 text-${theme}-tsec`}>
        Vyber se, zadej svou váhu a poté ulož změny.
      </h2>
      <select
        className={`bg-${theme}-cardbg text-${theme}-tpr text-xl p-2 cursor-pointer`}
        name="members"
        id="memberSelector"
        onChange={(e) => onSelectChangeHandle(e)}
      >
        {options}
      </select>

      <div className={`mt-5`}>
        <button
          className={`text-center text-${theme}-tsec text-3xl mx-2`}
          onClick={() =>
            setInputWeight((parseFloat(inputWeight) - 0.1).toFixed(1))
          }
        >
          &#8592;
        </button>
        <input
          className={`w-32 font-bold text-4xl bg-${theme}-cardbg text-${theme}-tpr text-center`}
          type=" number"
          id="weightInput"
          name="weight"
          min="65"
          max="150"
          step="0.1"
          value={inputWeight}
          onChange={(e) => onInputHandle(e)}
        ></input>

        <button
          className={`text-center text-${theme}-tsec text-3xl mx-2`}
          onClick={() =>
            setInputWeight((parseFloat(inputWeight) + 0.1).toFixed(1))
          }
        >
          &#8594;
        </button>
      </div>

      <div>
        {/* <input
          className={`w-full sm:w-full lg:w-64 mt-5 bg-${theme}-cardbg cursor-pointer`}
          type="range"
          id="points"
          name="points"
          min="65"
          max="110"
          value={inputWeight}
          onChange={(e) => onInputHandle(e)}
          step="0.1"
        ></input> */}
      </div>

      <div className={`flex justify-center flex-wrap mt-10 `}>
        <button
          onClick={() => props.submitHandler()}
          type="button"
          className={`w-32 rounded-full text-${theme}-sec px-3 py-2 sm:py-2 md:py-3 m-3 mt-5 sm:mt-5 md:mt-12`}
        >
          Zrušit
        </button>
        <button
          onClick={() => onSubmit()}
          type="submit"
          className={`w-32 rounded-full font-bold bg-${theme}-sec bg-opacity-25 text-${theme}-sec hover:bg-opacity-50 px-3 py-2 sm:py-2 md:py-3 m-3 mt-5 sm:mt-5 md:mt-12`}
        >
          Uložit změny
        </button>
      </div>
    </div>
  );
}

export default ModalWeightView;
