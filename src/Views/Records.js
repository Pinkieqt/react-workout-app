import React, { useState } from "react";
import Exercises from "../Helpfiles/Exercises";
import Members from "../Helpfiles/Members";

function RecordsComponent(){
    
    const [selectedUser, setSelectedUser] = useState("dudu");

    const tableCells = Exercises.map((exercise) => 
        <tr key={exercise.key}>
            <td className="border px-4 py-2">{exercise.label}</td>
            <td className="border px-4 py-2">15</td>
            <td className="border px-4 py-2">28</td>
        </tr>
    )

    let options = Members.map((member) => 
        <option key={member.key} value={member.key}>
            {member.label}
        </option>
    );

    function onSelectChangeHandle(e){
        setSelectedUser(e.target.value);
    }


    return (
        <div>
            <select className="text-center items-center" name="members" id="memberSelector" onChange={(e) => onSelectChangeHandle(e)}>
                {options}
            </select>

            <table className="table-auto">
                <thead>
                    <tr>
                    <th className="px-4 py-2">Cvik</th>
                    <th className="px-4 py-2">Pracovka</th>
                    <th className="px-4 py-2">Maximálka</th>
                    </tr>
                </thead>
                <tbody>
                    {tableCells}
                </tbody>
                </table>
        </div>
    )
}

export default RecordsComponent;