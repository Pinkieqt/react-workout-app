import React, { useState, useEffect } from "react";
import Members from "../Helpfiles/Members";
import Notification from "../Components/Notification";

const firebase = require('firebase');

function ModalWeightView(props){

    const [selectedUser, setSelectedUser] = useState("dudu");
    const [inputWeight, setInputWeight] = useState(70);


    let options = Members.map((member) => 
        <option key={member.key} value={member.key}>
            {member.label}
        </option>
    );

    //Get previous weight of selected user
    useEffect(() => {
        const memberData = props.usersData.data.filter(item => {
            return item.id === selectedUser;
        });

        //Get latest weight record
        let tmpWeight = memberData[0].weightData[memberData[0].weightData.length - 1];

        //Set it as state
        if (tmpWeight !== undefined) setInputWeight(tmpWeight.weight);
        else setInputWeight(70);
        
    }, [selectedUser]);

    //Select handler
    function onSelectChangeHandle(e){
        setSelectedUser(e.target.value);
    }

    //Range select handler
    function onInputHandle(e){
        setInputWeight(e.target.value);
    }

    function onSubmit(){
        const db = firebase.firestore();

        let date = new Date();
        date.setHours(12, 0, 0, 0);

        const memberData = props.usersData.data.filter(member => {
            return member.id === selectedUser;
        });

        let tmpWeight = memberData[0].weightData;
        tmpWeight.push({date: firebase.firestore.Timestamp.fromDate(date), weight: inputWeight});

        //Update record in database
        db.collection("users").doc(selectedUser).update({ weightData : tmpWeight })
        .catch(function(error) {
            console.log(error);
            Notification("Chyba", true);
        });

        //Notification
        Notification("Váha byla zapsána pro uživatele " + memberData[0].name + ".", false);

        //Dismiss modal
        props.submitHandler();
    }

    return (
        <div>
            <h2 className="font-bold mt-5 mb-5 text-myTheme-tsec">Vyber se, zadej svou váhu a poté ulož změny.</h2>
            <select className="text-myTheme-tpr text-xl p-2" name="members" id="memberSelector" onChange={(e) => onSelectChangeHandle(e)}>
                {options}
            </select>

            <div className="mt-5">
                <input className="font-bold text-4xl text-myTheme-tpr text-center" type="number" id="weightInput" name="weight" min="65" max="100" step="0.1" value={inputWeight} onChange={(e) => onInputHandle(e)}>
                </input>
            </div>

            <div>
                <input className="w-full sm:w-full lg:w-64 mt-5" type="range" id="points" name="points" min="65" max="110" value={inputWeight} onChange={(e) => onInputHandle(e)} step="0.1">
                </input>
            </div>

            <div className="flex justify-center flex-wrap">
                <button onClick={() => props.submitHandler()} type="button" className="w-32 rounded-lg shadow-xl border px-3 py-1 sm:py-1 md:py-3 m-3 mt-5 sm:mt-5 md:mt-12">Zrušit</button>
                <button onClick={() => onSubmit()} type="submit" className="rounded-lg font-bold bg-myTheme-pr text-white shadow-xl border px-3 py-1 sm:py-1 md:py-3 m-3 mt-5 sm:mt-5 md:mt-12">Uložit změny</button>
            </div>

        </div>
    )
}

export default ModalWeightView;