import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import BarGraph from "../Components/BarGraph";
import { ThemeContext } from "../Utilities/ThemeContext";
import LineGraph from "../Components/LineGraph";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Notification from "../Components/Notification";
import ArrivalsGraph from "../Components/ArrivalsGraph";

const firebase = require('firebase');

function DashboardComponent(props){
    const { theme, setTheme } = React.useContext(ThemeContext);
    //props.usersData.
    //prichody tento rok, prichody celkove, posledni prichod
    const [content, setContent] = useState({thisYear: "", total: "", latest: "", monthDiffer: ""});
    const [arrivalsTableContent, setArrivalsTableContent] = useState();
    const [barGraphContent, setBarGraphContent] = useState([]);
    const [lineGraphContent, setLineGraphContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //function to generate content for dashboard graphs, cards, etc.
    function generateContent(){
        let thisYear = 0;
        let total = 0;
        let latest = 0;
        let monthLastYear = 0;
        let monthThisYear = 1;

        let latestArrivals = [];
        let barGraphData = [];

        props.usersData.data.forEach(user => {

            let userArrivalsEveryYear = {name: user.name}

            user.arrivals.forEach(arrival => {
                //Counting
                total++;
                let nDate = new Date();
                if (arrival.toDate().getYear() === nDate.getYear()) thisYear++;

                if (arrival.toDate().getYear() === nDate.getYear()-1 && arrival.toDate().getMonth() === nDate.getMonth()) monthLastYear++;
                if (arrival.toDate().getYear() === nDate.getYear() && arrival.toDate().getMonth() === nDate.getMonth()) monthThisYear++;

                if (arrival > latest) latest = arrival;

                //Latest arrivals table
                latestArrivals.push({member: user.name, date: arrival.toDate(), key: total})


                //Getting data for bar graph
                let arrivalYear = arrival.toDate().getFullYear();
                userArrivalsEveryYear[arrivalYear] ? userArrivalsEveryYear[arrivalYear] += 1 : userArrivalsEveryYear[arrivalYear] = 1
            });

            //Bar graph content
            //userArrivalsEveryYear["Celkem"] = user.arrivals.length
            barGraphData.push(userArrivalsEveryYear);
        });

        //Sort latest arrivals
        latestArrivals = latestArrivals.sort((a, b) => b.date - a.date);
        
        //Map elements to html
        latestArrivals = latestArrivals.slice(0,5).map(element => {
            let tmpDate = element.date.getDate() + "/" + (element.date.getMonth() + 1);
            return (
                <tr key={element.key}>
                    <td className={`border border-${theme}-ttern px-4 py-1 text-${theme}-tsec`}>{element.member}</td>
                    <td className={`border border-${theme}-ttern px-4 py-1 text-${theme}-tsec`}>{tmpDate}</td>
                    <td className={`border border-${theme}-ttern px-4 py-1`}>
                        <span>
                            <FontAwesomeIcon role="img" aria-label="fntawsm" className={`cursor-pointer text-${theme}-tsec hover:text-${theme}-pr`} icon={ faTrashAlt } onClick={() => deleteLastArrival(element)} />
                        </span>
                    </td>
                </tr>
            )
        })


        let date = latest.toDate().getDate() + "/" + (latest.toDate().getMonth() + 1);

        setArrivalsTableContent(latestArrivals);
        setBarGraphContent(barGraphData);
        setContent({thisYear: thisYear, total: total, latest: date, monthDiffer: monthThisYear - monthLastYear});
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
                        if(window.confirm("Opravdu vymazat záznam?")){
                            tmpArrivals.splice(tmpArrivals.indexOf(arrival), 1);
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
        <div className={`p-3 min-h-screen bg-${theme}-bg`}>
            {isLoading &&
                <div className={`flex justify-center mt-64`}>  
                    <LoadingSpinner/> 
                </div>
            }

            {!isLoading &&
                <div className={`container mx-auto md:px-32`}>
                    <div className={`flex justify-center flex-wrap`}>
                        <div className={`w-full mb-12 sm:mb-12 md:mb-0 mt-5 sm:mt-5 md:mt-10`}>
                            <h1 className={`font-bold text-2xl text-center text-${theme}-tsec`}>Dashboard</h1>
                        </div>
                        <div className={`w-full flex justify-between flex-wrap mb-12 sm:mb-12 md:mb-0`}>
                            <div className={`w-2/4 sm:w-2/4 md:w-48 h-32 bg-${theme}-cardbg rounded shadow-xl m-0 sm:m-0 md:m-6 text-center`}>
                                <div className={`w-full h-1 bg-magma-1`}></div>
                                <div className={`pt-6 text-${theme}-tsec`}> celkem </div>
                                <div className={`text-4xl font-bold text-${theme}-tpr`}> {content.total} </div>
                            </div>
                            <div className={`w-2/4 sm:w-2/4 md:w-48 h-32 bg-${theme}-cardbg rounded shadow-xl m-0 sm:m-0 md:m-6 text-center`}>
                                <div className={`w-full h-1 bg-magma-2`}></div>
                                <div className={`pt-6 text-${theme}-tsec`}> rozdíl příchodů </div>
                                <div className={`text-4xl font-bold text-${theme}-tpr`}> {content.monthDiffer} </div>
                            </div>
                            <div className={`w-2/4 sm:w-2/4 md:w-48 h-32 bg-${theme}-cardbg rounded shadow-xl m-0 sm:m-0 md:m-6 text-center`}>
                                <div className={`w-full h-1 bg-magma-3`}></div>
                                <div className={`pt-6 text-${theme}-tsec`}> tento rok </div>
                                <div className={`text-4xl font-bold text-${theme}-tpr`}> {content.thisYear} </div>
                            </div>
                            <div className={`w-2/4 sm:w-2/4 md:w-48 h-32 bg-${theme}-cardbg rounded shadow-xl m-0 sm:m-0 md:m-6 text-center`}>
                                <div className={`w-full h-1 bg-magma-4`}></div>
                                <div className={`pt-6 text-${theme}-tsec`}> poslední příchod</div>
                                <div className={`text-4xl font-bold text-${theme}-tpr`}> {content.latest} </div>
                            </div>
                        </div>

                        {/* Příchody */}
                        <div className={`w-full mb-2 sm:mb-2 md:mb-0`}>
                            <h1 className={`font-bold text-2xl text-center text-${theme}-tsec`}>Příchody</h1>
                            <h3 className={`text-center text-${theme}-tsec`}>V grafu níže lze pozorovat měsíční srovnání příchodů v jednotlivých letech.</h3>
                        </div>

                        {/* Linechart */}
                        <div className={`w-full h-40 sm:h-40 md:h-64 p-1 sm:p-1 md:p-6 mb-12 sm:mb-12 md:mb-0`}>
                            <div className={`w-full h-40 sm:h-40 md:h-64 bg-${theme}-cardbg rounded shadow-xl text-center`} >
                                <LineGraph categories={lineGraphContent}/>
                            </div>
                        </div>

                        <div className={`w-full flex justify-center flex-wrap mb-1 sm:mb-1 md:mt-12`}>
                            {/* Barchart */}
                            <div className={`w-full sm:w-full md:w-3/5 h-64 p-1 sm:p-1 md:p-6 mt-2 sm:mt-2 md:mt-0 mb-16 sm:mb-16 md:mb-0`}>
                                <div className={`w-full`}>
                                    <h3 className={`text-center text-${theme}-tsec mb-2`}>Příchody jednotlivých členů</h3>
                                </div>
                                <div className={`w-full h-64 bg-${theme}-cardbg rounded shadow-xl p-2 text-center`}>
                                    <BarGraph arrivals={barGraphContent}/>
                                </div>
                            </div>

                            <div className={`w-full sm:w-full md:w-2/5 h-64 p-1 sm:p-1 md:p-6 mt-2 sm:mt-2 md:mt-0 mb-12 sm:mb-12 md:mb-0`}>
                                <div className={`w-full`}>
                                    <h3 className={`text-center text-${theme}-tsec mb-2`}>Poslední příchody</h3>
                                </div>
                                <div className={`w-full h-64 bg-${theme}-cardbg rounded shadow-xl p-2 text-center`}>
                                    <table className={`w-full table-auto text-center py-2 h-56`}>
                                            <thead>
                                                <tr>
                                                    {/* TODO: overflow a dát jich tam třeba 15 aby to bylo scrollable */}
                                                    <th className={`px-4 py-1 text-${theme}-tpr font-normal`}>Uživatel</th>
                                                    <th className={`px-4 py-1 text-${theme}-tpr font-normal`}>Příchod</th>
                                                    <th className={`px-4 py-1 text-${theme}-tpr`}></th>
                                                </tr>
                                            </thead>
                                        <tbody>
                                            {arrivalsTableContent}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        
                        {/* ArrivalsGraph */}
                        <div className={`w-full p-1 sm:p-1 md:p-6 mb-12 sm:mb-12 md:mb-12 mt-5 sm:mt-5 md:mt-20`}>
                            <div className={`w-full`}>
                                <h3 className={`text-center text-${theme}-tsec mb-2`}>Heat mapa příchodů pro nynější rok</h3>
                            </div>
                            <div className={`w-full bg-${theme}-cardbg rounded shadow-xl text-center`}>
                                <ArrivalsGraph usersData={props.usersData}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DashboardComponent;