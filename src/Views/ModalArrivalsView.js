import React, { useState } from "react";
import Members from "../Helpfiles/Members";
import Notification from "../Components/Notification";

import DatePicker from 'react-date-picker';

const firebase = require('firebase');

function ModalArrivalView(props){

    const [selectedButtons, setSelectedButtons] = useState({dudu: false, luke: false, tom: false, dejvo: false, cahlik: false});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [date, setDate] = useState(new Date());

    // HAVE To be there because updating dictionary in state (for example the dictionary two lines up) 
    // does NOT call the render function!
    // changing other state then does this... sorcery..
    const [renderFix, setRenderFix] = useState(false);

    //Buttons with members
    let checkedButton = "bg-gradient-to-r from-mytheme-300 to-mytheme-400 text-white w-32 p-2 m-2 shadow rounded-md";
    let uncheckedButton = "bg-white hover:bg-mytheme-200 bg-opacity-25 text-white w-32 p-2 m-2 shadow rounded-md transition duration-500 ease-in-out";

    let checkboxItems = Members.map((item) => 
        <button className={selectedButtons[item.key] ? checkedButton : uncheckedButton} onClick={() => onCheckChange(item.key)} key={item.key}>{item.label}</button>
    );

    //On member button click handler
    function onCheckChange(key){
        let tmpDict = selectedButtons;
        tmpDict[key] = !tmpDict[key];
        setSelectedButtons(tmpDict);
        setIsSubmitDisabled(false);
        setRenderFix(!renderFix);
    }
    
    //Function to register members when arriving
    function onSubmit(){
        const db = firebase.firestore();

        let selectedDate = date;
        selectedDate.setHours(12, 0, 0, 0);
    
        let addedMembers = [];
        let notAddedMembers = [];

        for (let element in selectedButtons){
            let arrived = selectedButtons[element];
            let isInside = false;
            //Member arrived
            if(arrived){
                const memberData = props.usersData.data.filter(member => {
                    return member.id === element;
                });

                //check if member is already registered
                memberData[0].arrivals.forEach(arrival => {
                    if (arrival.toDate().getTime() === firebase.firestore.Timestamp.fromDate(selectedDate).toDate().getTime()){
                        isInside = true;
                    }
                });

                if (!isInside) {
                    let tmpArrivals = memberData[0].arrivals;
                    tmpArrivals.push(firebase.firestore.Timestamp.fromDate(selectedDate));
                    db.collection("users").doc(element).update({ arrivals : tmpArrivals });
                    addedMembers.push(memberData[0].name);
                }
                else {
                    notAddedMembers.push(memberData[0].name);
                }
            }
        }

        //Notification
        if (addedMembers.length > 1) Notification("Uživatelé " + addedMembers.toString() + " připsáni.", false);
        else if (addedMembers.length === 1) Notification("Uživatel " + addedMembers.toString() + " připsán.", false);

        if (notAddedMembers.length > 1) Notification("Uživatelé " + notAddedMembers.toString() + " jsou již zapsáni.", true);
        if (notAddedMembers.length === 1) Notification("Uživatel " + notAddedMembers.toString() + " je již zapsán.", true);
        
        //Dismiss modal
        props.submitHandler();
    }


    //Render
    return (
        <div>
            <div>
                <p className="py-6 text-gray-300">Níže lze vybrat jiné datum pro pozdější zápisy.</p>
                {/* <DayPickerInput value={date} onDayChange={day => setDate(day)} hideOnDayClick format="MM/dd/yyyy"/> */}
                    <DatePicker
                        onChange={day => setDate(day)} 
                        value={date}
                        className="bg-white bg-opacity-25 text-white shadow rounded-md p-2"
                        calendarClassName="text-black"
                        clearIcon={null}
                        calendarIcon={null}
                    />
            </div>
            <h2 className="font-bold mt-5 text-gray-300">Klikni na členy, kteří dnes přišli do posilovny a ulož změny.</h2>
            <h2 className="font-bold mb-5 text-gray-300"> O provedených změnách budeš informován.</h2>
            <div className="flex-col sm:flex-col md:flex-row items-center">
                {checkboxItems}
            </div>
            <div>
                <button disabled={isSubmitDisabled} onClick={() => onSubmit()} type="submit" className="bg-white hover:bg-red-400 text-white bg-opacity-25 w-full sm:w-full md:w-32 lg:w-32 p-2 mt-8 shadow rounded-md font-bold transition duration-500 ease-in-out">Uložit změny</button>
            </div>
        </div>
    )
}

export default ModalArrivalView;