import React, { useEffect, useState } from "react";
import { useTransition, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import Notification from "./Notification";

const firebase = require('firebase');

function FloatingDialog(props){ //usersData, selectedUser, exercise (key)

    const [show, setShow] = useState(false);
    const [max, setMax] = useState(0);
    const [work, setWork] = useState(0);

    useEffect(() => {
        setMax(props.exMax);
        setWork(props.exWork);
    }, [props])

    //React spring
    const menuTransition = useTransition(show, null, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
    })

    //function on button submit
    function onSubmit(){
        const db = firebase.firestore();
        //get initial data of exerscise for selected member
        if(props.usersData !== undefined){
            const memberData = props.usersData.data.filter(member => {
                return member.id === props.selectedUser;
            });

            let isExerciseInside = false;

            if(memberData.length > 0){
                let tmpExData = memberData[0].exercisesData;
                tmpExData.forEach(element => {
                    if (element.key === props.exercise){
                        isExerciseInside = true;
                        element.work = work;
                        element.max = max;
                    }
                })
                
                if(!isExerciseInside){
                    tmpExData.push({ key : props.exercise, max: max, work: work });
                }

                //Update record in database
                db.collection("users").doc(props.selectedUser).update({ exercisesData : tmpExData })
                .then(function (){
                    Notification("Záznam byl upraven.", false)
                })
                .catch(function(error) {
                    console.log(error); 
                    Notification("Chyba", true);
                });

                //Close dialog
                setShow(false);
            }
        }
    }

    return (
        <>
            <span>
                <FontAwesomeIcon className="text-myTheme-tsec hover:text-myTheme-tpr cursor-pointer" icon={ faEdit } onClick={() => setShow(!show)}/>
            </span>

            { /* Menu transition and content */ }
            {
                menuTransition.map(({ item, key, props }) =>
                    item && 
                    <animated.div 
                        key={key} 
                        style={props} 
                        className="fixed bg-black-t-30 top-0 left-0 w-full h-auto z-50"
                        // onClick={() => setShow(!show)}
                    >
                        <div className="flex h-screen">
                            <div className="m-auto">
                                <div className="w-full sm:w-full md:w-64 bg-white rounded-lg shadow-md m-1 sm:m-1 md:m-6 text-center">

                                    <h2 className="py-6 text-xl text-myTheme-tpr">Úprava váhy</h2>

                                    <label className="w-full text-myTheme-tsec">
                                        Pracovní váha
                                    </label>
                                    <div className="py-3">
                                        <input className="font-bold text-xl text-center text-myTheme-tpr" 
                                                type="number" id="workingWeight" name="workingWeight" min="0" max="300" 
                                                step="0.5" value={work} onChange={(e) => setWork(e.target.value)} />
                                    </div>

                                    <label className="w-full text-myTheme-tsec pt-5">
                                        Maximální váha
                                    </label>
                                    <div className="py-3">
                                        <input className="font-bold text-xl text-center text-myTheme-tpr" 
                                                type="number" id="maxWeight" name="maxWeight" min="0" max="300" 
                                                step="0.5" value={max} onChange={(e) => setMax(e.target.value)} />
                                    </div>
                                    <div className="flex justify-center w-full">
                                        <button onClick={() => setShow(!show)} type="submit" className="w-1/2 rounded-lg shadow-xl border p-3 m-3 mt-12">Storno</button>
                                        <button onClick={() => onSubmit()} type="button" className="rounded-lg font-bold bg-myTheme-pr text-white shadow-xl border p-3 m-3 mt-12 w-1/2">Uložit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </animated.div>
                )
            }
        </>
    )
}

export default FloatingDialog;