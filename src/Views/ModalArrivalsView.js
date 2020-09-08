import React, { useState } from "react";
import Members from "../Helpfiles/Members";

function ModalArrivalView(){

    const [selectedButtons, setSelectedButtons] = useState({dudu: false, luke: false, tom: false, dejvo: false, cahlik: false});

    let x = "bg-gray-200";
    let y = "bg-red-200";

    //Checkboxes
    let checkboxItems = Members.map((item) => 
            <button className="bg-gray-400 w-32 p-2 m-2 shadow rounded-md" onClick={() => onCheckChange(item.key)} key={item.key}>{item.label}</button>
    );

    function onCheckChange(key){
        let tmpDict = selectedButtons;
        tmpDict[key] = !tmpDict[key];
        setSelectedButtons(tmpDict);
        console.log(selectedButtons);
    }
    
    function onSubmit(){
        console.log("yesss");
    }

    //Render
    //fckin' conditional class names.. -> {selectedButtons.dudu ? 'bg-gray-200' : 'bg-red-200'} DOESNT WORK AT ALL
    return (
        <div>
            <h2 className="font-bold mt-5 mb-5">Klikni na lidi, kteří dnes přišli do posilovny a následně ulož změny.</h2>
            <div className="flex-col sm:flex-col md:flex-row items-center">
                {checkboxItems}
            </div>
            <div>
                <button className={x} onClick={() => console.log(checkboxItems)}>test</button>
            </div>
            <div>
                <button onClick={() => onSubmit()} type="submit" className="bg-gray-400 w-full sm:w-full lg:w-32 p-2 mt-8 shadow rounded-md font-bold">Uložit změny</button>
            </div>
        </div>
    )
}


/*
<label key={item.label} className="w-32 h-32">
    <input type="checkbox" value={item.label} key={item.key} onChange={() => onCheckChange(item.key)}></input>
    {item.label}
</label>
*/

export default ModalArrivalView;