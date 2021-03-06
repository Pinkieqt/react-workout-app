import React, { useState } from "react";
import { ThemeContext } from "../Utilities/ThemeContext";
import { UserContext } from "../App";
import TopLoginDesign from "../Graphics/TopLoginDesign";
import BottomLoginDesign from "../Graphics/BottomLoginDesign";
import Top from "../Graphics/icon.png";

const firebase = require("firebase");

function LoginComponent() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { loggedUser, setLoggedUser } = React.useContext(UserContext);

  const [stayLogged, setStayLogged] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [pass, setPass] = useState("");

  function inputHandle(e) {
    setPass(e.target.value);
  }

  function login() {
    if (stayLogged) {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword("ezworkout@ezworkout.ez", pass);
        })
        .catch((e) => {
          console.log(e.message);
          setWrongPass(true);
        });
    } else {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword("ezworkout@ezworkout.ez", pass);
        })
        .catch((e) => {
          console.log(e.message);
          setWrongPass(true);
        });
    }
  }

  function enterKey(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      login();
    }
  }

  function handleCheckboxChange(e) {
    setStayLogged(e.target.checked);
  }

  return (
    <div className={`w-screen h-full max-h-full overflow-hidden`}>
      <div className="absolute top-0 left-0 w-3/5 sm:w-3/5 md:w-2/5 z-10">
        <TopLoginDesign />
      </div>
      <div className="fixed bottom-0 right-0 w-3/5 sm:w-3/5 md:w-2/5 z-10">
        <BottomLoginDesign />
      </div>
      <div
        className={`flex justify-center w-screen h-screen text-center bg-${theme}-bg`}
      >
        <div className="m-auto">
          <div className={`w-full sm:w-full md:w-64 text-center z-30`}>
            <h1 className={`text-4xl text-${theme}-tpr m-5`}>Přihlášení</h1>
            <h6 className={`text-${theme}-tsec`}>Zadej heslo:</h6>
            <input
              className={`rounded-full text-${theme}-tsec bg-${theme}-cardbg border border-${theme}-ttern p-2 m-1`}
              type="password"
              onChange={(e) => inputHandle(e)}
              onKeyDown={(e) => enterKey(e)}
            ></input>
            {wrongPass === true ? (
              <h6 className={`text-magma-3`}>Špatné heslo</h6>
            ) : (
              <h6></h6>
            )}

            <div className="w-full sm:w-full md:w-64">
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e)}
              />
              <label className={`text-${theme}-tsec`}> Zůstat přihlášen?</label>
            </div>

            <button
              className={`w-32 rounded-full bg-${theme}-sec text-white   border border-${theme}-cardbg p-1 px-3 m-3 mt-5 sm:mt-5 md:mt-12`}
              type="submit"
              onClick={() => login()}
            >
              Přihlásit
            </button>
            {/* <button className="bg-red-300" onClick={() => login2()}>guest</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
