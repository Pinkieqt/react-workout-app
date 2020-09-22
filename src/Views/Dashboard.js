import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import BarGraph from "../Components/BarGraph";
import LineGraph from "../Components/LineGraph";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Notification from "../Components/Notification";

const firebase = require('firebase');

function DashboardComponent(props){
    //props.usersData.
    //prichody tento rok, prichody celkove, posledni prichod
    const [content, setContent] = useState({thisYear: "", total: "", latest: ""});
    const [arrivalsTableContent, setArrivalsTableContent] = useState();
    const [barGraphContent, setBarGraphContent] = useState([]);
    const [lineGraphContent, setLineGraphContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //function to generate content for dashboard graphs, cards, etc.
    function generateContent(){
        let thisYear = 0;
        let total = 0;
        let latest = 0;

        let latestArrivals = [];
        let barGraphData = [];

        props.usersData.data.forEach(user => {
            user.arrivals.forEach(arrival => {
                //Counting
                total = total + 1;

                if (arrival.toDate().getYear() === new Date().getYear()) thisYear++;

                if (arrival > latest) latest = arrival;


                //Latest arrivals table
                latestArrivals.push({member: user.name, date: arrival.toDate(), key: total})
            });

            //Bar graph content
            barGraphData.push({name: user.name, arrivals: user.arrivals.length});
        });

        //Sort latest arrivals
        latestArrivals = latestArrivals.sort((a, b) => b.date - a.date);
        
        //Map elements to html
        latestArrivals = latestArrivals.slice(0,5).map(element => {
            let tmpDate = element.date.getDate() + "/" + (element.date.getMonth() + 1);
            return (
                <tr key={element.key}>
                    <td className="border px-4 py-1">{element.member}</td>
                    <td className="border px-4 py-1">{tmpDate}</td>
                    <td className="border px-4 py-1">
                        <span>
                            <FontAwesomeIcon className="cursor-pointer text-gray-600 hover:text-mytheme-500" icon={ faTrashAlt } onClick={() => deleteLastArrival(element)} />
                        </span>
                    </td>
                </tr>
            )
        })


        let date = latest.toDate().getDate() + "/" + (latest.toDate().getMonth() + 1);

        setArrivalsTableContent(latestArrivals);
        setBarGraphContent(barGraphData);
        setContent({thisYear: thisYear, total: total, latest: date});
    }

    //function to delete last arrival
    function deleteLastArrival(element){
        const db = firebase.firestore()

        let tmpArrivals = [];
        props.usersData.data.forEach(user => {
            if (user.name === element.member){
                tmpArrivals = user.arrivals;
                tmpArrivals.forEach(arrival => {
                    if (arrival.toDate().getTime() === firebase.firestore.Timestamp.fromDate(element.date).toDate().getTime()){
                        //Delete arrival from array
                        tmpArrivals.splice(tmpArrivals.indexOf(arrival), 1);

                        if(window.confirm("Opravdu vymazat záznam?")){
                            //Update record in database
                            db.collection("users").doc(user.id).update({ arrivals : tmpArrivals })
                            .then(function (){
                                Notification("Záznam byl smazán.", false)
                            })
                            .catch(function(error) {
                                console.log(error); 
                                Notification("Chyba", true);
                            });
                        }
                    }
                });
            }
        });

    }

    //function to generate data for line graph
    function generateLineGraph(){
        let allArrivals = [];
        let categories = {};

        //Combining arrays
        props.usersData.data.forEach(element => {
            allArrivals = allArrivals.concat(element.arrivals);
        });

        allArrivals.forEach(date => {
            let tmpDate = date.toDate();
            if (categories[tmpDate.getYear()]){
                categories[tmpDate.getYear()][tmpDate.getMonth()]++;
            }
            else {
                categories[tmpDate.getYear()] = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0};
                categories[tmpDate.getYear()][tmpDate.getMonth()]++;
            }           
        });

        setLineGraphContent(categories);
    }

    //Generate new content everytime when props change
    useEffect(() => {
        if (props.usersData.data.length > 0){
            generateContent();
            generateLineGraph();
            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }, [props]);



    /* 
        Render
    */
    return (
        <div>
            {isLoading &&
                <div className="flex justify-center mt-64 ">  
                    <LoadingSpinner/> 
                </div>
            }

            {!isLoading &&
                <div className="flex justify-center flex-wrap">
                    <div className="w-full">
                        <h1 className="font-bold text-2xl text-center">PŘÍCHODY</h1>
                    </div>
                    
                    <div className="w-full flex justify-center flex-wrap">
                        <div className="w-full sm:w-full md:w-64 h-32 bg-white rounded-lg shadow-md m-1 sm:m-1 md:m-6 text-center">
                            <div className="pt-6"> celkem </div>
                            <div className="text-4xl font-bold"> {content.total} </div>
                        </div>
                        <div className="w-full sm:w-full md:w-64 h-32 bg-white rounded-lg shadow-md m-1 sm:m-1 md:m-6 text-center">
                            <div className="pt-6"> tento rok </div>
                            <div className="text-4xl font-bold"> {content.thisYear} </div>
                        </div>
                        <div className="w-full sm:w-full md:w-64 h-32 bg-white rounded-lg shadow-md m-1 sm:m-1 md:m-6 text-center">
                            <div className="pt-6"> poslední </div>
                            <div className="text-4xl font-bold"> {content.latest} </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center flex-wrap">
                        {/* Barchart */}
                        <div className="w-full sm:w-full md:w-2/5 h-64 bg-white rounded-lg shadow-md m-1 sm:m-1 md:m-5 p-2 text-center">
                            <BarGraph arrivals={barGraphContent}/>
                        </div>

                        <div className="w-full sm:w-full md:w-1/5 h-64 bg-white rounded-lg shadow-md m-1 sm:m-1 md:m-5 p-2 text-center">
                            <table className="w-full table-auto text-center py-2 h-56">
                                    <thead>
                                        <tr>
                                            {/* TODO: overflow a dát jich tam třeba 15 aby to bylo scrollable */}
                                            <th className="px-4 py-1">Uživatel</th>
                                            <th className="px-4 py-1">Příchod</th>
                                            <th className="px-4 py-1"></th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {arrivalsTableContent}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Linechart */}
                    <div className="w-full sm:w-full md:w-2/3 h-40 sm:h-40 md:h-64 bg-white rounded-lg shadow-md m-1 sm:m-1 md:m-1 p-2 text-center" >
                        <LineGraph categories={lineGraphContent}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default DashboardComponent;