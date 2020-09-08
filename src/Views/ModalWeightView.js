import React, { useState } from "react";
import Members from "../Helpfiles/Members";

function ModalWeightView(){

    const [selectedUser, setSelectedUser] = useState("dudu");
    const [inputWeight, setInputWeight] = useState(66.6);


    let options = Members.map((member) => 
        <option key={member.key} value={member.key}>
            {member.label}
        </option>
    );

    function onSelectChangeHandle(e){
        setSelectedUser(e.target.value);
    }

    function onInputHandle(e){
        setInputWeight(e.target.value);
    }

    function onSubmit(){
        console.log([selectedUser, inputWeight]);
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