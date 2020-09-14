import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import BarGraph from "../Components/BarGraph";
import LineGraph from "../Components/LineGraph";

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
            let tmpDate = element.date.getDate() + "/" + element.date.getMonth();
            return (
                <tr key={element.key}>
                    <td className="border px-4 py-2">{element.member}</td>
                    <td className="border px-4 py-2">{tmpDate}</td>
                </tr>
            )
        })


        let date = latest.toDate().getDate() + "/" + latest.toDate().getMonth();

        setArrivalsTableContent(latestArrivals);
        setBarGraphContent(barGraphData);
        setContent({thisYear: thisYear, total: total, latest: date});
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
        <div className="container items-center text-center">
            {isLoading &&
                <div className="flex justify-center mt-64 ">  
                    <LoadingSpinner/> 
                </div>
            }

            {!isLoading &&
                <div>
                    <h1 className="font-bold text-2xl text-center">PŘÍCHODY</h1>
                    <div className="flex justify-center">
                        <div className="w-64 h-32 rounded-lg shadow-md m-1 sm:m-1 md:m-5 text-center">
                            <div className="pt-6"> celkem </div>
                            <div className="text-4xl font-bold"> {content.total} </div>
                        </div>
                        <div className="w-64 h-32 rounded-lg shadow-md m-1 sm:m-1 md:m-5 text-center">
                            <div className="pt-6"> tento rok </div>
                            <div className="text-4xl font-bold"> {content.thisYear} </div>
                        </div>
                        <div className="w-64 h-32 rounded-lg shadow-md m-1 sm:m-1 md:m-5 text-center">
                            <div className="pt-6"> poslední </div>
                            <div className="text-4xl font-bold"> {content.latest} </div>
                        </div>
                    </div>

                    <table className="table-auto text-center">
                            <thead>
                                <tr>
                                    {/* TODO: overflow a dát jich tam třeba 15 aby to bylo scrollable */}
                                    <th className="px-4 py-2">Uživatel</th>
                                    <th className="px-4 py-2">Datum příchodu</th>
                                </tr>
                            </thead>
                        <tbody>
                            {arrivalsTableContent}
                        </tbody>
                    </table>

                    {/* Barchart */}
                    <div className="w-200 h-200">
                        <BarGraph arrivals={barGraphContent}/>
                    </div>

                    {/* Linechart */}
                    <div className="w-200 h-200">
                        <LineGraph categories={lineGraphContent}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default DashboardComponent;