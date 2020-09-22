import React, { useEffect, useState } from "react";
import Months from "../Helpfiles/Months";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineGraph(props){

    function getLines(){
        let result = Months;

        for (let entry in props.categories){
            for (let month in props.categories[entry]){
                let slicedEntry = entry.substring(1);
                result[month][slicedEntry] = props.categories[entry][month];
            }
        }
        return result;
    }

    const graphData = getLines();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={graphData}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="abbreviation" />
                {/* <YAxis /> */}
                <Tooltip />
                {/* <Legend /> */}

                { graphData[0][18] > -1 && <Line type="monotone" dataKey="18" stroke="#f56565"  strokeWidth={2}/> }
                { graphData[0][19] > -1 && <Line type="monotone" dataKey="19" stroke="#8884d8"  strokeWidth={2}/> }
                { graphData[0][20] > -1 && <Line type="monotone" dataKey="20" stroke="#48bb78"  strokeWidth={2}/> }
                { graphData[0][21] > -1 && <Line type="monotone" dataKey="21" stroke="#8884d8"  strokeWidth={2}/> }
                { graphData[0][22] > -1 && <Line type="monotone" dataKey="22" stroke="#8884d8"  strokeWidth={2}/> }
                { graphData[0][23] > -1 && <Line type="monotone" dataKey="23" stroke="#8884d8"  strokeWidth={2}/> }


            </LineChart>
      </ResponsiveContainer>
    );
}

export default LineGraph;