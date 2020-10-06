import React, { useState } from "react";
import Members from "../Helpfiles/Members";
import Notification from "../Components/Notification";
import { useMediaQuery } from 'react-responsive';
import DatePicker from 'react-date-picker';

const firebase = require('firebase');

function ModalArrivalView(props){

    const [selectedButtons, setSelectedButtons] = useState({dudu: false, luke: false, tom: false, dejvo: false, cahlik: false});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [date, setDate] = useState(new Date());
    const isMobile = useMediaQuery({ query: "(max-device-width: 1024px)" });

    // HAVE To be there because updating dictionary in state (for example the dictionary two lines up) 
    // does NOT call the render function!
    // changing other state then does this... sorcery..
    const [renderFix, setRenderFix] = useState(false);

    //Buttons with members
    let checkedButton = "bg-magma-2 border border-myLightTheme-sec text-white w-32 px-2 py-1 sm:py-1 md:py-2  m-2 shadow-xl rounded-md transition duration-500 ease-in-out";
    let uncheckedButton = "text-myLightTheme-tpr border w-32 px-2 py-1 sm:py-1 md:py-2  m-2 shadow-xl rounded-md transition duration-500 ease-in-out";

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
                {!isMobile &&
                    <p className="py-6 text-myLightTheme-tsec">Níže lze vybrat jiné datum pro pozdější zápisy.</p>
                }
                {/* <DayPickerInput value={date} onDayChange={day => setDate(day)} hideOnDayClick format="MM/dd/yyyy"/> */}
                    <DatePicker
                        onChange={day => setDate(day)} 
                        value={date}
                        className="text-myLightTheme-tpr shadow rounded-md px-2 py-1 sm:py-1 md:py-2 cursor-pointer"
                        calendarClassName="text-black bg-myLightTheme-cardbg"
                        clearIcon={null}
                        calendarIcon={null}
                    />
            </div>
            <h2 className="font-bold mt-5 text-myLightTheme-tsec">Klikni na členy, kteří dnes přišli do posilovny a ulož změny.</h2>
            {!isMobile &&
                <h2 className="font-bold mb-5 text-myLightTheme-tsec"> O provedených změnách budeš informován.</h2>
            }
            <div className="flex-col sm:flex-col md:flex-row items-center">
                {checkboxItems}
            </div>
            <div className="flex justify-center flex-wrap">
                <button onClick={() => props.submitHandler()} type="button" className="w-32 rounded-lg text-myLightTheme-tpr shadow-xl border px-3 py-1 sm:py-1 md:py-3 m-3 mt-5 sm:mt-5 md:mt-12">Zrušit</button>
                <button disabled={isSubmitDisabled} onClick={() => onSubmit()} type="submit" className="rounded-lg font-bold bg-myLightTheme-sec text-myLightTheme-tpr shadow-xl border border-myLightTheme-cardbg px-3 py-1 sm:py-1 md:py-3 m-3 mt-5 sm:mt-5 md:mt-12">Uložit změny</button>
            </div>
        </div>
    )
}

export default ModalArrivalView;