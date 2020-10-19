import React, { useState } from "react";
import { ThemeContext } from "../Utilities/ThemeContext";
import { UserContext } from "../App";
import TopLoginDesign from "../Graphics/TopLoginDesign"
import BottomLoginDesign from "../Graphics/BottomLoginDesign"
import Top from '../Graphics/icon.png';

const firebase = require('firebase');

function LoginComponent(){
    const { theme, setTheme } = React.useContext(ThemeContext);
    const { loggedUser, setLoggedUser } = React.useContext(UserContext);

    const [wrongPass, setWrongPass] = useState(false)
    const [pass, setPass] = useState("")

    function inputHandle(e) {
        setPass(e.target.value);
    }

    function login(){
        firebase
        .auth()
        .signInWithEmailAndPassword("ezworkout@ezworkout.ez", pass)
        .then(res => {
            if (res.user) {
                setLoggedUser("ss");
                setWrongPass(false);
            }
        })
        .catch(e => {
            console.log(e.message);
            setWrongPass(true);
        });
    }

    function enterKey(e){
        if(e.keyCode == 13 && e.shiftKey == false) {
            login();
        }
    }

    function login2(){
        firebase
        .auth()
        .signInWithEmailAndPassword("guest@ezworkout.ez", "guestez")
        .then(res => {
            if (res.user) {
                setWrongPass(false);
                setLoggedUser("ss");
            }
        })
        .catch(e => {
            setWrongPass(true);
            console.log(e.message)
        });
    }

    return (
        <div className={`w-screen h-screen bg-${theme}-bg`}>
            <div className={`flex justify-center z-50`}>
                <div className={`w-4/5 sm:w-4/5 md:w-64 text-center mt-48 sm:mt-48 md:mt-64`}>
                    <h1 className={`text-4xl text-${theme}-tpr m-5`}>Přihlášení</h1>
                    <h6 className={`text-${theme}-tsec`}>Zadej heslo:</h6>
                    <input className={`rounded-full text-${theme}-tsec bg-${theme}-cardbg border border-${theme}-ttern p-2 m-1`} type="password" onChange={(e) => inputHandle(e)} onKeyDown={(e) => enterKey(e)}></input>
                    {
                        wrongPass === true ?
                            <h6 className={`text-magma-3`}>Špatné heslo</h6>
                        :
                            <h6></h6>
                    }
                    
                    <button className={`w-32 rounded-full bg-${theme}-sec text-white shadow-xl border border-${theme}-cardbg p-1 px-3 m-3 mt-5 sm:mt-5 md:mt-12`} type="submit" onClick={() => login()}>Přihlásit</button>
                    {/* <button className="bg-red-300" onClick={() => login2()}>guest</button> */}
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;