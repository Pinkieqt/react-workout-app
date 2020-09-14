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

        const memberData = props.usersData.data.filter(item => {
            return item.id === selectedUser;
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
            <h2 className="font-bold mt-5 mb-5">Vyber se, zadej svou váhu a poté ulož změny.</h2>
            <select name="members" id="memberSelector" onChange={(e) => onSelectChangeHandle(e)}>
                {options}
            </select>

            <div className="mt-5">
                <input className="font-bold text-4xl bg-gray-300 text-center" type="number" id="weightInput" name="weight" min="65" max="100" step="0.1" value={inputWeight} onChange={(e) => onInputHandle(e)}>
                </input>
            </div>

            <div>
                <input className="w-full sm:w-full lg:w-64 mt-5" type="range" id="points" name="points" min="65" max="110" value={inputWeight} onChange={(e) => onInputHandle(e)} step="0.1">
                </input>
            </div>

            <div>
                <button onClick={() => onSubmit()} type="submit" className="bg-gray-400 w-full sm:w-full lg:w-32 p-2 mt-8 shadow rounded-md font-bold">Uložit změny</button>
            </div>

        </div>
    )
}

export default ModalWeightView;