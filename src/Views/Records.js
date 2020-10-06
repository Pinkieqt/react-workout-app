import React, { useState, useEffect } from "react";

import LoadingSpinner from "../Components/LoadingSpinner";
import Exercises from "../Helpfiles/Exercises";
import Members from "../Helpfiles/Members";
import FloatingDialog from "../Components/FloatingDialog";

function RecordsComponent(props){
    
    const [selectedUser, setSelectedUser] = useState("dudu");
    const [isLoading, setIsLoading] = useState(true);

    //Generate new content everytime when props change
    useEffect(() => {
        if (props.usersData.data.length > 0){
            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }, [props, selectedUser]);

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
            let tableDesign = "bg-orange-300"; //LEGS default
            if (exercise.category === "chest") tableDesign = "bg-blue-300";
            else if (exercise.category === "back") tableDesign = "bg-yellow-400";
            else if (exercise.category === "shoulders") tableDesign = "bg-red-300";
            else if (exercise.category === "arms") tableDesign = "bg-green-300";

            return (
                <div key={exercise.key} className={`w-full sm:w-full md:w-56 bg-myLightTheme-cardbg rounded-lg shadow-lg m-1 sm:m-1 md:m-5 mb-5 text-left`}>
                    <div className={`w-full h-1 rounded-full ${tableDesign}`}></div>
                    <span className="flex justify-between px-3 pt-2">
                        <span className={`tracking-wider inline-block text-myLightTheme-cardbg text-xs px-2 mt-2 rounded-full uppercase  ${tableDesign}`}> {exercise.kategorie} </span>
                        <FloatingDialog usersData={props.usersData} selectedUser={selectedUser} exercise={exercise.key} exMax={max} exWork={work} />
                    </span>
                    <div className="px-6 pb-6 mt-2">
                        <div className="font-bold text-myLightTheme-tpr"> {exercise.label} </div>
                        <div className="text-myLightTheme-tsec"> Pracovní váha: {work} kg</div>
                        <div className="text-myLightTheme-tsec"> Maximální váha: {max} kg</div>
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


    return (
        
        <div className="items-center text-center">
            {isLoading &&
                <div className="flex justify-center mt-64 ">  
                    <LoadingSpinner/> 
                </div>
            }

            {!isLoading &&
                <div className="container mx-auto">
                    <span>
                        <h3 className="text-myLightTheme-tsec mb-5">Vyber uživatele a uprav váhy kliknutím na ikonu "editace" v pravém rohu každého cviku.</h3>
                    </span>
                    <select className="text-myLightTheme-tpr bg-myLightTheme-bg text-xl p-2 mb-5 cursor-pointer" name="members" id="memberSelector" onChange={(e) => setSelectedUser(e.target.value)}>
                        {options}
                    </select>
                    <div className="flex justify-center flex-wrap">
                        {cards}
                    </div>
                </div>
            }
        </div>
    )
}

export default RecordsComponent;