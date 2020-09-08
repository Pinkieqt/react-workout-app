import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import Exercises from "../Helpfiles/Exercises";
import Members from "../Helpfiles/Members";

function RecordsComponent(){
    
    const [selectedUser, setSelectedUser] = useState("dudu");
    const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });

    //Table cells
    const tableCells = Exercises.map(exercise => {
        let tableDesign = "bg-orange-200";
        if (exercise.category === "chest") tableDesign = "bg-blue-200";
        else if (exercise.category === "back") tableDesign = "bg-yellow-200";
        else if (exercise.category === "shoulders") tableDesign = "bg-red-400";
        else if (exercise.category === "arms") tableDesign = "bg-red-600";

        return (
            <tr key={exercise.key}>
                <td className={`border px-4 py-2 ${tableDesign}`}>{exercise.label}</td>
                <td className="border px-4 py-2">15</td>
                <td className="border px-4 py-2">28</td>
            </tr>
        )
    })

    //Table heading cells
    const tableHeaderCells = Members.map(member => 
        <th key={member.key} colspan="2">{member.label}</th>
    );

    //Select options
    let options = Members.map((member) => 
        <option key={member.key} value={member.key}>
            {member.label}
        </option>
    );

    function onSelectChangeHandle(e){
        setSelectedUser(e.target.value);
    }


    return (
        <div className="items-center text-center">
            {isMobile &&
                <select className="mb-5" name="members" id="memberSelector" onChange={(e) => onSelectChangeHandle(e)}>
                    {options}
                </select>
            }
            <div className="flex justify-center">
                <table className="table-auto text-center">
                        {!isMobile &&
                            <thead>
                                <tr>
                                    <th></th>
                                    {tableHeaderCells}
                                </tr>
                                <tr>
                                    {/* TODO: should map this, no copying.. */}
                                    <th className="px-4 py-2">Cvik</th>
                                    <th className="px-4 py-2">Pracovka</th>
                                    <th className="px-4 py-2">Maximálka</th>
                                    <th className="px-4 py-2">Pracovka</th>
                                    <th className="px-4 py-2">Maximálka</th>
                                    <th className="px-4 py-2">Pracovka</th>
                                    <th className="px-4 py-2">Maximálka</th>
                                    <th className="px-4 py-2">Pracovka</th>
                                    <th className="px-4 py-2">Maximálka</th>
                                    <th className="px-4 py-2">Pracovka</th>
                                    <th className="px-4 py-2">Maximálka</th>
                                </tr>
                            </thead>
                        }
                        {isMobile &&
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Cvik</th>
                                    <th className="px-4 py-2">Pracovka</th>
                                    <th className="px-4 py-2">Maximálka</th>
                                </tr>
                            </thead>
                        }
                    <tbody>
                        {tableCells}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecordsComponent;