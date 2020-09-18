import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import LoadingSpinner from "../Components/LoadingSpinner";
import Exercises from "../Helpfiles/Exercises";
import Members from "../Helpfiles/Members";

function RecordsComponent(props){
    
    const [selectedUser, setSelectedUser] = useState("dudu");
    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownActive, setIsDropdownACtive] = useState(false);

    //Generate new content everytime when props change
    useEffect(() => {
        if (props.usersData.data.length > 0){
            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }, [props]);

    //Cards
    let cards = Exercises.map(exercise  => {
        if (!isLoading){
            const memberData = props.usersData.data.filter(member => {
                return member.id === selectedUser;
            });

            let work = 0;
            let max = 0;

            //Members max and work weights
            if (memberData){
                if (memberData[0].exercisesData.length > 0){
                    memberData[0].exercisesData.forEach(element => {
                        if (element.key === exercise.key){
                            work = element.work;
                            max = element.max;
                        }
                    });
                }
            }

            //Color of card background -> legs/shoulders/hands/chest/back
            let tableDesign = "bg-orange-300 "; //LEGS default
            if (exercise.category === "chest") tableDesign = "bg-blue-300";
            else if (exercise.category === "back") tableDesign = "bg-yellow-400";
            else if (exercise.category === "shoulders") tableDesign = "bg-red-300";
            else if (exercise.category === "arms") tableDesign = "bg-green-300";

            return (
                <div key={exercise.key} className={`w-full sm:w-full md:w-56 bg-white rounded-lg shadow-lg m-1 sm:m-1 md:m-5 mb-5 text-left`}>
                    <div className={`w-full h-1 rounded-full ${tableDesign}`}></div>
                    <span className="flex justify-between px-3 pt-2">
                        <span className={`inline-block text-white text-xs px-2 rounded-full uppercase ${tableDesign}`}> {exercise.kategorie} </span>
                        <FontAwesomeIcon className="text-gray-600 hover:text-red-400 cursor-pointer" icon={ faEdit } onClick={() => setIsDropdownACtive(true)}/>
                    </span>
                    <div className="px-6 pb-6">
                        <div className="font-bold"> {exercise.label} </div>
                        <div className=""> Pracovní váha: {work} </div>
                        <div className=""> Maximální váha: {max} </div>
                    </div>
                </div>
            );
        }
    });

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
            {isLoading &&
                <div className="flex justify-center mt-64 ">  
                    <LoadingSpinner/> 
                </div>
            }

            {!isLoading &&
                <div>
                    <select className="mb-5" name="members" id="memberSelector" onChange={(e) => onSelectChangeHandle(e)}>
                        {options}
                    </select>
                    <div className="flex justify-center flex-wrap">
                        {cards}
                    </div>
                    {isDropdownActive &&
                        <div className="flex justify-center content-center bg-gray-500 w-64 h-64">
                            ahooj
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default RecordsComponent;